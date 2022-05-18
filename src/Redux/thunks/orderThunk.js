import {STATUS_CODE} from '../../Services/constants';
import {orderProductsService} from '../../Services/orderService';
import {getUserProfileThunk} from './userThunk';

export const orderProductsThunk = (data, onSuccess, onFailure) => {
  return async dispatch => {
    try {
      const res = await orderProductsService(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        onSuccess();
        dispatch(getUserProfileThunk);
      }
    } catch (error) {
      console.log(error);
      onFailure();
    }
  };
};
