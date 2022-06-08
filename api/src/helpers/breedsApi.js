const axios = require("axios");
const { API_KEY } = process.env;

const breedsApi = async (name) => {
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
  try {
    const resp = await instance.get();
    return resp.data;
  } catch (err) {
    throw new Error("Request failed with status code 404");
  }
};

module.exports = breedsApi;
