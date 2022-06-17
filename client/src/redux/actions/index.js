export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED = "GET_BREED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";

export const getAllBreeds =
  (name = "") =>
  (dispatch) => {
    return fetch(`http://localhost:3001/dogs${name ? "?name=" + name : ""}`)
      .then((response) => response.json())
      .then((breeds) => dispatch({ type: GET_ALL_BREEDS, payload: breeds }))
      .catch((err) => alert("No matches were found for any breed"));
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
export const getBreed = (id) => (dispatch) => {
  return (
    fetch(`http://localhost:3001/dogs/${id}`)
      .then((response) => response.json())
      .then((breed) => dispatch({ type: GET_BREED, payload: breed }))
      //probar
      .catch((err) => alert(err))
  );
};
export const getTemperaments = () => (dispatch) => {
  return fetch(`http://localhost:3001/temperaments`)
    .then((response) => response.json())
    .then((temperaments) =>
      dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments })
    )
    .catch((err) => console.log(err));
};
export const filterByTemp = (temps) => {
  return {
    type: FILTER_BY_TEMP,
    payload: temps,
  };
};
