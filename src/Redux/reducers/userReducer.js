import {actionTypes} from '../constants/actionTypes';

const defaultUserProfile = {
  ordersHistory: [],
  email: '',
  name: '',
  password: null,
  gender: false,
  phone: '',
  facebookId: '',
  deleted: false,
  avatar: 'http://svcy3.myclass.vn/images/user-icon.png',
};

const initialState = {
  user: null,
  favouriteProducts: [],
  userProfile: defaultUserProfile,
};

// A reducer used to store user information
const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SET_USER_INFO:
      return {...state, user: payload};

    case actionTypes.SET_USER_FAVOURITE_PRODUCTS:
      return {...state, favouriteProducts: payload};

    case actionTypes.SET_USER_PROFILE:
      return {...state, userProfile: payload};

    default:
      return state;
  }
};

export default userReducer;
