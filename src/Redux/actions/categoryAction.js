import {actionTypes} from '../constants/actionTypes';

export const setCategoryListAction = payload => ({
  type: actionTypes.SET_CATEGORY_LIST,
  payload,
});
