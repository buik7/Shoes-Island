import {actionTypes} from '../constants/actionTypes';

export const setUserInfoAction = payload => ({
  type: actionTypes.SET_USER_INFO,
  payload,
});

export const setUserFavouriteProductsAction = payload => ({
  type: actionTypes.SET_USER_FAVOURITE_PRODUCTS,
  payload,
});

export const setUserProfileAction = payload => ({
  type: actionTypes.SET_USER_PROFILE,
  payload,
});
