import { GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../actions";
import { sortByName, sortByWeight } from "./helpers/sorts";

const initialStore = {
  breeds: [],
  breedsCreated: [],
  breed: {},
};

const rootReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: sortByName(action.payload),
        breedsCreated: action.payload.filter((breed) =>
          isNaN(Number(breed.id))
        ),
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        breeds: sortByName(state.breeds, action.payload.order),
      };
    case ORDER_BY_WEIGHT:
      return {
        ...state,
        breeds: sortByWeight(state.breeds, action.payload.order),
      };
    default:
      return state;
  }
};

export default rootReducer;
