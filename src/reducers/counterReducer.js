// Initial State
import { types } from "../action/actionType";
const initialState = {
    counter: 0,
    loader: false,
    apilist:null,
    displayapi:null,

  }; 
  console.log("reducer is there ")
  // Redux: Counter Reducer
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.LOGIN_LOADER: {
        return { ...state, loader: action.payload }
    }
      case 'INCREASE_COUNTER_ASYNC': {
        return {
          ...state,
          counter: state.counter + action.value,
        };
      }
      case 'DECREASE_COUNTER': {
        return {
          ...state,
          counter: state.counter - action.value,
        };
      }
      case 'GET_API': {
        return { ...state, apilist: action.payload }
    }
      case 'API_LIST_SUCCESS': {
        return { ...state, displayapi: action.payload }
    }
      default: {
        return state;
      }
    }
  };
  // Exports
  export default counterReducer;
  