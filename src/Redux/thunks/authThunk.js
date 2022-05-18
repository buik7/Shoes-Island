import {signInService, signUpService} from '../../Services/authService';
import {STATUS_CODE} from '../../Services/constants';
import {setUserInfoAction} from '../actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInThunk = (userInfo, onSuccess, onFailure) => {
  return async dispatch => {
    try {
      const res = await signInService(userInfo);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setUserInfoAction(res.data.content));
        try {
          await AsyncStorage.setItem(
            'SHOES_SHOP_TOKEN',
            res.data.content.accessToken,
          );
        } catch (error) {
          console.log(error);
        }
        onSuccess();
      }
    } catch (error) {
      if (error.response.status) {
        onFailure(error.response.status);
      }
    }
  };
};

export const signUpThunk = (userInfo, onSuccess, onFailure) => {
  return async dispatch => {
    try {
      const res = await signUpService(userInfo);
      if (res.status === STATUS_CODE.CREATE_SUCCESS) {
        onSuccess();
      }
    } catch (error) {
      if (error.response.status) {
        onFailure(error.response.status);
      }
    }
  };
};
