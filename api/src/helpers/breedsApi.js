const axios = require("axios");
const { API_KEY } = process.env;

const breedsApi = async (alldetails = false, name) => {
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
    let obj = {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament,
      height: breed.height.metric,
      //No viene image cuando hago la peticion a la ruta /search
      image: breed.image?.url,
    };
    if (alldetails) {
      obj["weight"] = breed.weight.metric;
      obj["life_span"] = breed.life_span;
    }
    return obj;
  });
  return breeds;
};
module.exports = breedsApi;
