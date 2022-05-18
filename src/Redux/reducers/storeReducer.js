import {actionTypes} from '../constants/actionTypes';

const initialState = {
  storeList: [],
};

const storeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SET_STORE_LIST:
      return {...state, storeList: payload};
    default:
      return state;
  }
};

export default storeReducer;
