import {
  GET_ALL_BREEDS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_BREED,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMP,
} from "../actions";
import { sortByName, sortByWeight } from "./helpers/sorts";

const initialStore = {
  breeds: [],
  breedsCreated: [],
  breedsExist: [],
  breed: {},
  temperaments: [],
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
        breedsExist: action.payload.filter((breed) => !isNaN(Number(breed.id))),
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        breeds:
          action.payload.type === "all"
            ? sortByName(
                [...state.breedsCreated, ...state.breedsExist],
                action.payload.order
              )
            : action.payload.type === "exist"
            ? sortByName(state.breedsExist, action.payload.order)
            : sortByName(state.breedsCreated, action.payload.order),
      };
    case ORDER_BY_WEIGHT:
      return {
        ...state,
        breeds:
          action.payload.type === "all"
            ? sortByWeight(
                [...state.breedsCreated, ...state.breedsExist],
                action.payload.order
              )
            : action.payload.type === "exist"
            ? sortByWeight(state.breedsExist, action.payload.order)
            : sortByWeight(state.breedsCreated, action.payload.order),
      };
    case GET_BREED:
      return {
        ...state,
        breed: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMP:
      return {
        ...state,
        breeds: state.breeds.filter((breed) => {
          const breedTemp = breed.temperament;
          if (breedTemp) {
            const tempArr = breedTemp.split(", ");
            const condition = action.payload.every((temp) =>
              tempArr.includes(temp)
            );
            if (condition) return true;
          }
          return false;
        }),
      };
    default:
      return state;
  }
};

export default rootReducer;
