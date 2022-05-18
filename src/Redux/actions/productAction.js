import {actionTypes} from '../constants/actionTypes';

export const setProductListAction = payload => ({
  type: actionTypes.SET_PRODUCT_LIST,
  payload,
});

export const setProductDetailAction = payload => ({
  type: actionTypes.SET_PRODUCT_DETAIL,
  payload,
});

export const setFeaturedProductListAction = payload => ({
  type: actionTypes.SET_FEATURE_PRODUCT_LIST,
  payload,
});

export const setCategoryProductListAction = payload => ({
  type: actionTypes.SET_CATEGORY_PRODUCT_LIST,
  payload,
});
