const normalizeTemper = (arrOfEntities) => {
  return arrOfEntities.map((breed) => {
    const breedData = breed.get({ plain: true });
    if (breedData.temperament.length > 0) {
      const arrTemp = breedData.temperament.map((temp) => temp.name);
      breedData.temperament = arrTemp.join(", ");
    } else {
      breedData.temperament = "";
    }
    return breedData;
  });
};

module.exports = normalizeTemper;

//Otra forma de hacerlo
/* breedsOfDb = JSON.parse(JSON.stringify(breedsOfDb)).map((breed) => {
  if (breed.temperament.length > 0) {
    breed.temperament = breed.temperament.map((temp) => temp.name);
    console.log(breed.temperament);
    breed.temperament = breed.temperament.join(", ");
  } else {
    breed.temperament = "";
  }
  return breed;
}); */
