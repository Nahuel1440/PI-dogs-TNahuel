const tempersApi = require("./tempersApi");

const upTempToDb = async (Temperament) => {
  try {
    const arrTempers = await tempersApi();
    arrTempers.sort((a, b) => (a.name > b.name ? 1 : -1));
    await Temperament.bulkCreate(arrTempers);
  } catch (err) {
    console.log("Error: No se pudo cargar los temperamentos de la api a la db");
  }
};

module.exports = upTempToDb;
