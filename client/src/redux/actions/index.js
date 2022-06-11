export const GET_ALL_BREEDS = "GET_ALL_BREEDS";

export const getAllBreeds = () => (dispatch) => {
  return fetch("http://localhost:3001/dogs")
    .then((response) => response.json())
    .then((breeds) => dispatch({ type: GET_ALL_BREEDS, payload: breeds }))
    .catch((err) => console.log(err));
};
