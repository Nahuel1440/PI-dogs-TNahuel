const { Router } = require("express");
const {
  getAllBreeds,
  postBreed,
  getBreedById,
} = require("../controllers/dogs");

const router = Router();

//Endpoints
router.get("/", getAllBreeds);
router.post("/", postBreed);
router.get("/:idBreed", getBreedById);

module.exports = router;
