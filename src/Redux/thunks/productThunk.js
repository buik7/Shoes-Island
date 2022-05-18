import {STATUS_CODE} from '../../Services/constants';
import {
  getFeaturedProductListService,
  getProductDetailService,
  getProductListByCategoryService,
  getProductListService,
} from '../../Services/productService';
import {
  setCategoryProductListAction,
  setFeaturedProductListAction,
  setProductDetailAction,
  setProductListAction,
} from '../actions/productAction';

export const getProductListThunk = async dispatch => {
  try {
    const res = await getProductListService();
    if (res.status === STATUS_CODE.SUCCESS) {
      dispatch(setProductListAction(res.data.content));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedProductListThunk = async dispatch => {
  try {
    const res = await getFeaturedProductListService();
    if (res.status === STATUS_CODE.SUCCESS) {
      dispatch(setFeaturedProductListAction(res.data.content));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductListByCategoryThunk = categoryId => {
  return async dispatch => {
    try {
      const res = await getProductListByCategoryService(categoryId);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setCategoryProductListAction(res.data.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailThunk = productId => {
  return async dispatch => {
    try {
      const res = await getProductDetailService(productId);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setProductDetailAction(res.data.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
