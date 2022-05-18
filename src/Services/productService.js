import {DOMAIN} from './constants';
import request from './request';

export const getProductListService = () => {
  return request({
    method: 'GET',
    url: `${DOMAIN}/Product`,
  });
};

export const getCategoryListService = () => {
  return request({
    method: 'GET',
    url: `${DOMAIN}/Product/getAllCategory`,
  });
};

export const getProductListByCategoryService = categoryId => {
  return request({
    method: 'GET',
    url: `${DOMAIN}/Product/getProductByCategory?categoryId=${categoryId}`,
  });
};

export const getFeaturedProductListService = () => {
  return request({
    method: 'GET',
    url: `${DOMAIN}/Product/getProductByFeature`,
  });
};

export const getProductDetailService = productId => {
  return request({
    method: 'GET',
    url: `${DOMAIN}/Product/getbyid?id=${productId}`,
  });
};
