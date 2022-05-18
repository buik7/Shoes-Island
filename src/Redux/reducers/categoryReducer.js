import {actionTypes} from '../constants/actionTypes';

const initialState = {
  categoryList: [],
};

const categoryReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SET_CATEGORY_LIST:
      return {...state, categoryList: payload};

    default:
      return state;
  }
};

export default categoryReducer;
