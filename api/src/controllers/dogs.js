const axios = require("axios");
const { API_KEY } = process.env;
const { Breed, Temper } = require("../db");
//Ver si puedo crear una clase, que pueda instanciar aca, para que directamente tenga en ella el array con todos
// los breeds que me traiga la API

const getAllBreeds = async (req, res, next) => {
  const { name } = req.query;
  let baseURL = "https://api.thedogapi.com/v1/breeds",
    params = {},
    // ver como mandar solo los attributes que me pide la pag principal  attributes: ["name", "image", "temperament", "weight"]
    options = {};
  if (name) {
    params = { q: `${name}` };
    baseURL += "/search";
    options.where = { [Op.substring]: name };
  }
  const instance = axios.create({
    baseURL,
    headers: { "x-api-key": `${API_KEY}` },
    params,
  });
  try {
    const resp = await instance.get(),
      breedsOfApi = resp.data,
      breedsOfDb = await Breed.findAll(options);
    res.json([...breedsOfApi, ...breedsOfDb]);
  } catch (err) {
    next({ message: err, status: 404 });
  }
};

const getBreedById = async (req, res, next) => {
  const { idBreed } = req.params;
  let breed, breeds;
  try {
    if (!isNaN(Number(idBreed))) {
      //VER COMO CREAR LA INSTANCIA PARA QUE NO SE REPITA
      const instance = axios.create({
        baseURL: "https://api.thedogapi.com/v1/breeds",
        headers: { "x-api-key": `${API_KEY}` },
      });
      breeds = await instance.get();
      breed = breeds.data.find((br) => br.id === parseInt(idBreed));
      console.log(breed);
    } else {
      breed = await Breed.findByPk(idBreed);
    }
    if (breed) res.json(breed);
    else throw new Error("Not found");
  } catch (err) {
    next({ message: err.message, status: 404 });
  }
};

const postBreed = async (req, res, next) => {
  //ids es un array con las ids de los temperamentos a agregar
  const { name, weight, height, life_span, ids } = req.body;
  try {
    const newBreed = await Breed.create({ name, weight, height, life_span });
    newBreed.addTempers([]);
    res.status(201).json(newBreed);
  } catch (err) {
    next({ message: err, status: 400 });
  }
};

module.exports = {
  getAllBreeds,
  getBreedById,
  postBreed,
};
// USANDO PROMESAS
// const GetAllBreeds = function (req, res) {
//   try {
//     let breeds = [];
//     const instance = axios.create({
//       baseURL: `https://api.thedogapi.com/v1/breeds`,
//       headers: { "x-api-key": `${API_KEY}` },
//     });
//     instance
//       .get()
//       .then((resp) => {
//         breeds = resp.data;
//         return Breed.findAll().then(
//           (breedsOfDb) => (breeds = [...breeds, ...breedsOfDb])
//         );
//       })
//       .then((breeds) => res.json(breeds));
//   } catch (err) {
//     console.log(err);
//   }
// };
