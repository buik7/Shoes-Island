import {DOMAIN} from './constants';
import request from './request';

export const orderProductsService = orderDetail => {
  return request(
    {
      method: 'POST',
      url: `${DOMAIN}/Users/order`,
      data: orderDetail,
    },
    false,
  );
};
