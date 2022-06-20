const { Op } = require("sequelize");
const { Breed, Temperament } = require("../db");
const getBreedsApi = require("../helpers/breedsApi");
const normalizeTemper = require("../helpers/normalizeTemper");

const getAllBreeds = async (req, res, next) => {
  const { name } = req.query;
  const optOfFindAll = {
    include: {
      model: Temperament,
      as: "temperament",
      attributes: ["name"],
      through: { attributes: [] },
    },
  };
  if (name) {
    optOfFindAll.where = { name: { [Op.iLike]: `%${name}%` } };
  }
  try {
    const breedsOfApi = await getBreedsApi(false, name);
    let breedsOfDb = await Breed.findAll(optOfFindAll);
    breedsOfDb = normalizeTemper(breedsOfDb);
    allBreeds = [...breedsOfApi, ...breedsOfDb];
    if (allBreeds.length) {
      res.json(allBreeds);
    } else {
      throw new Error("No breeds found with that name");
    }
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
      breedFound = await Breed.findByPk(idBreed, {
        include: {
          model: Temperament,
          as: "temperament",
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      [breedFound] = normalizeTemper([breedFound]);
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
    await newBreed.addTemperament(ids);
    res.status(201).json(newBreed);
  } catch (err) {
    next({ message: err.message, status: 400 });
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
