const { Router } = require("express");
const { getTemperaments } = require("../controllers/temperaments");

const router = Router();

router.get("/", getTemperaments);

module.exports = router;
