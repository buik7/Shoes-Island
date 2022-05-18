import {DOMAIN} from './constants';
import request from './request';

export const signInService = userInfo => {
  return request({
    method: 'POST',
    url: `${DOMAIN}/Users/signin`,
    data: userInfo,
  });
};

export const signUpService = userInfo => {
  return request({
    method: 'POST',
    url: `${DOMAIN}/Users/signup`,
    data: userInfo,
  });
};

export const signInWithFacebookService = userInfo => {
  return request({
    method: 'POST',
    url: `${DOMAIN}/Users/facebooklogin`,
    data: userInfo,
  });
};
