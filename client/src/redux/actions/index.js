export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";

export const getAllBreeds = () => (dispatch) => {
  return fetch("http://localhost:3001/dogs")
    .then((response) => response.json())
    .then((breeds) => dispatch({ type: GET_ALL_BREEDS, payload: breeds }))
    .catch((err) => console.log(err, "Error en recibir el json"));
};

export const orderBreedsByName = ({ order, type }) => {
  return {
    type: ORDER_BY_NAME,
    payload: { order, type },
  };
};
export const orderBreedsByWeight = ({ order, type }) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload: { order, type },
  };
};
