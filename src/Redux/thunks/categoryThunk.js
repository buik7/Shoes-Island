import {STATUS_CODE} from '../../Services/constants';
import {getCategoryListService} from '../../Services/productService';
import {setCategoryListAction} from '../actions/categoryAction';

export const getCategoryListThunk = async dispatch => {
  try {
    const res = await getCategoryListService();
    if (res.status === STATUS_CODE.SUCCESS) {
      dispatch(setCategoryListAction(res.data.content));
    }
  } catch (error) {
    console.log(error);
  }
};
