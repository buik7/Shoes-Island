import request from './request';
import {DOMAIN} from './constants';

export const getStoreListService = () => {
  return request({
    method: 'GET',
    url: `${DOMAIN}/Product/getAllStore`,
  });
};
