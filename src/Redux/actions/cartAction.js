import {actionTypes} from '../constants/actionTypes';

export const addToCartAction = payload => ({
  type: actionTypes.ADD_TO_CART,
  payload,
});

export const removeFromCartAction = payload => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload,
});

export const makeCartEmptyAction = () => ({
  type: actionTypes.MAKE_CART_EMPTY,
});

export const incrementQuantityInCartAction = payload => ({
  type: actionTypes.INCREMENT_QUANTITY_IN_CART,
  payload,
});

export const decrementQuantityInCartAction = payload => ({
  type: actionTypes.DECREMENT_QUANTITY_IN_CART,
  payload,
});
