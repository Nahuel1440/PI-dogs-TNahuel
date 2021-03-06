const axios = require("axios");
const { API_KEY } = process.env;

const getBreedsApi = async (alldetails = false, name) => {
  const instance = axios.create({
    baseURL: "https://api.thedogapi.com/v1/breeds",
    headers: { "x-api-key": `${API_KEY}` },
  });
  const resp = await instance.get();
  let breeds = resp.data.map((breed) => {
    const obj = {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament,
      weight: breed.weight.metric?.replace("NaN", "3"),
      image: breed.image?.url,
    };
    if (alldetails) {
      obj["height"] = breed.height.metric;
      obj["life_span"] = breed.life_span;
    }
    return obj;
  });
  if (name) {
    breeds = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  return breeds;
};

module.exports = getBreedsApi;

/* const getBreedsApi = async (alldetails = false, name) => {
  let baseURL = "https://api.thedogapi.com/v1/breeds",
    params = {};
  if (name) {
    baseURL += "/search";
    params = { q: `${name}` };
  }
  const instance = axios.create({
    baseURL,
    headers: { "x-api-key": `${API_KEY}` },
    params,
  });
  const resp = await instance.get();
  const breeds = resp.data.map((breed) => {
    const obj = {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament || "This dog's temperaments are a mystery",
      weight: breed.weight.metric?.replace("NaN", "3"),
      //No viene image cuando hago la peticion a la ruta /search
      image: breed.image?.url,
    };
    if (alldetails) {
      obj["height"] = breed.height.metric;
      obj["life_span"] = breed.life_span;
    }
    return obj;
  });
  return breeds;
}; */
