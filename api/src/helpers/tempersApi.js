const breedsApi = require("./breedsApi");

const tempersApi = async () => {
  const breeds = await breedsApi(true),
    objTemper = {};
  breeds.forEach((breed) => {
    if (breed.temperament !== "This dog's temperaments are a mystery") {
      const arr = breed.temperament ? breed.temperament.split(", ") : [];
      arr.forEach((temper) => {
        !objTemper.hasOwnProperty(temper) ? (objTemper[temper] = "") : null;
      });
    }
  });
  const arrTemper = Object.keys(objTemper).map((temp) => {
    return { name: temp };
  });
  return arrTemper;
};

module.exports = tempersApi;
