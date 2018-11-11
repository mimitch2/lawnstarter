import {combineReducers} from "redux";


const filmOrChar = (state = [], action) => {
  if (action.type === "SET_DATA") {
    return action.value
  }
  return state;
}

const filmOrCharLoaded = (state = false, action) => {
  if (action.type === "DATA_LOADED") {
    return action.value
  }
  return state;
}

const details = (state = {}, action) => {
  if (action.type === "SET_DETAILS") {
    return action.value
  }
  return state;
}

const detailsLoaded = (state = false, action) => {
  if (action.type === "DETAILS_LOADED") {
    return action.value
  }
  return state;
}

const rootReducer = combineReducers({
  filmOrChar, filmOrCharLoaded, details, detailsLoaded
});

export default rootReducer;