import {actionTypes} from '../constants/actionTypes';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, {type, payload}) => {
  let index, newCart;
  switch (type) {
    case actionTypes.ADD_TO_CART:
      index = state.cart.findIndex(item => item.id === payload.id);
      newCart = [...state.cart];
      payload.quantity = parseInt(payload.quantity);
      if (index === -1) {
        newCart.push(payload);
      } else {
        newCart[index].quantity += payload.quantity;
      }

      return {...state, cart: newCart};

    case actionTypes.REMOVE_FROM_CART:
      index = state.cart.findIndex(item => item.id === payload.id);
      newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      }
      return {...state, cart: newCart};

    case actionTypes.MAKE_CART_EMPTY:
      return {...state, cart: []};

    case actionTypes.INCREMENT_QUANTITY_IN_CART:
      index = state.cart.findIndex(item => item.id === payload.id);
      if (index === -1) return state;

      newCart = [...state.cart];
      newCart[index].quantity += 1;
      return {...state, cart: newCart};

    case actionTypes.DECREMENT_QUANTITY_IN_CART:
      index = state.cart.findIndex(item => item.id === payload.id);
      if (index === -1) return state;

      newCart = [...state.cart];
      newCart[index].quantity -= 1;
      return {...state, cart: newCart};

    default:
      return state;
  }
};

export default cartReducer;
