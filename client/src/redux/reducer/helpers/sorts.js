export const sortByName = (arr, order = "ascendent") => {
  //Creo un nuevo arr, ya que si devuelvo el mismo, redux no detecta el cambio
  const newArr = [...arr];
  if (order === "ascendent") {
    return newArr.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return newArr.sort((a, b) => (a.name > b.name ? -1 : 1));
};
export const sortByWeight = (arr, order) => {
  const newArr = [...arr];
  const getMinWeight = (breed) => {
    return Number(breed.weight.split(" - ")[0]);
  };
  if (order === "ascendent") {
    return newArr.sort((a, b) => {
      let weightA = getMinWeight(a);
      let weightB = getMinWeight(b);
      return weightA > weightB ? 1 : -1;
    });
  }
  return newArr.sort((a, b) => {
    let weightA = getMinWeight(a);
    let weightB = getMinWeight(b);
    return weightA > weightB ? -1 : 1;
  });
};
