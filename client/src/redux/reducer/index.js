import { GET_ALL_BREEDS } from "../actions";

const initialStore = {
  breeds: [],
  breed: {},
};

const rootReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        breeds: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
