const { Op } = require("sequelize");
const { Breed, Temperament } = require("../db");
const getBreedsApi = require("../helpers/breedsApi");

const getAllBreeds = async (req, res, next) => {
  const { name } = req.query;
  let options = name ? { where: { name: { [Op.substring]: name } } } : {};
  options.include = {
    model: Temperament,
    attributes: ["name"],
  };
  try {
    const breedsOfApi = await getBreedsApi(false, name),
      breedsOfDb = await Breed.findAll(options);
    res.json([...breedsOfApi, ...breedsOfDb]);
  } catch (err) {
    next({ message: err.message, status: 404 });
  }
};

const getBreedById = async (req, res, next) => {
  const { idBreed } = req.params;
  let breedFound, breedsOfApi;
  try {
    if (!isNaN(Number(idBreed))) {
      breedsOfApi = await getBreedsApi(true);
      breedFound = breedsOfApi.find((br) => br.id === parseInt(idBreed));
    } else {
      breedFound = await Breed.findByPk(idBreed);
    }
    if (breedFound) res.json(breedFound);
    else throw new Error("Not found");
  } catch (err) {
    next({ message: err.message, status: 404 });
  }
};

const postBreed = async (req, res, next) => {
  //ids es un array con las ids de los temperamentos a agregar
  const { name, weight, height, life_span, image, ids } = req.body;
  try {
    const newBreed = await Breed.create({
      name,
      weight,
      height,
      life_span,
      image,
    });
    newBreed.addTemperaments(ids);
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
