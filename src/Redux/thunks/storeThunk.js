import {STATUS_CODE} from '../../Services/constants';
import {getStoreListService} from '../../Services/storeService';
import {setStoreListAction} from '../actions/storeAction';

export const getStoreListThunk = async dispatch => {
  try {
    const res = await getStoreListService();
    if (res.status === STATUS_CODE.SUCCESS) {
      dispatch(setStoreListAction(res.data.content));
    }
  } catch (error) {
    console.log(error);
  }
};
