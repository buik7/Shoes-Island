import {actionTypes} from '../constants/actionTypes';

export const setStoreListAction = payload => ({
  type: actionTypes.SET_STORE_LIST,
  payload,
});
