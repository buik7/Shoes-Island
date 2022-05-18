import {DOMAIN} from './constants';
import request from './request';

export const getUserFavouriteProductsService = () => {
  return request(
    {
      method: 'GET',
      url: `${DOMAIN}/Users/getproductfavorite`,
    },
    true,
  );
};

export const likeProductService = productId => {
  return request(
    {
      method: 'GET',
      url: `${DOMAIN}/Users/like?productId=${productId}`,
    },
    true,
  );
};

export const unLikeProductService = productId => {
  return request(
    {
      method: 'GET',
      url: `${DOMAIN}/Users/unlike?productId=${productId}`,
    },
    true,
  );
};

export const getUserProfileService = () => {
  return request(
    {
      method: 'POST',
      url: `${DOMAIN}/Users/getProfile`,
    },
    true,
  );
};

export const updateUserProfileService = data => {
  return request(
    {
      method: 'POST',
      url: `${DOMAIN}/Users/updateProfile`,
      data,
    },
    true,
  );
};

export const updateUserPasswordService = data => {
  return request(
    {
      method: 'POST',
      url: `${DOMAIN}/Users/changePassword`,
      data,
    },
    true,
  );
};

export const updateUserAvatarService = data => {
  return request({
    method: 'POST',
    url: `${DOMAIN}/Users/uploadavatar`,
    data,
  });
};
