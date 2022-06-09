const { Temperament } = require("../db");

const getTemperaments = async (req, res, next) => {
  try {
    const tempers = await Temperament.findAll({ attributes: ["id", "name"] });
    res.json(tempers);
  } catch (err) {
    next({ message: err, status: 404 });
  }
};

module.exports = { getTemperaments };
