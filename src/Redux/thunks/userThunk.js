import {STATUS_CODE} from '../../Services/constants';
import {
  getUserFavouriteProductsService,
  getUserProfileService,
  likeProductService,
  unLikeProductService,
  updateUserAvatarService,
  updateUserPasswordService,
  updateUserProfileService,
} from '../../Services/userService';
import {
  setUserFavouriteProductsAction,
  setUserProfileAction,
} from '../actions/userAction';

export const getUserFavouriteProductsThunk = async dispatch => {
  try {
    const res = await getUserFavouriteProductsService();
    if (res.status === STATUS_CODE.SUCCESS) {
      dispatch(
        setUserFavouriteProductsAction(res.data.content.productsFavorite),
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeProductThunk = productId => {
  return async dispatch => {
    try {
      const res = await likeProductService(productId);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(getUserFavouriteProductsThunk);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const unLikeProductThunk = productId => {
  return async dispatch => {
    try {
      const res = await unLikeProductService(productId);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(getUserFavouriteProductsThunk);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserProfileThunk = async dispatch => {
  try {
    const res = await getUserProfileService();
    if (res.status === STATUS_CODE.SUCCESS) {
      dispatch(setUserProfileAction(res.data.content));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileThunk = (data, onSuccess, onFailure) => {
  return async dispatch => {
    try {
      const res = await updateUserProfileService(data);
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

export const updateUserPasswordThunk = (data, onSuccess, onFailure) => {
  return async dispatch => {
    try {
      const res = await updateUserPasswordService(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      onFailure();
    }
  };
};

export const updateUserAvatarThunk = (
  data,
  onSuccess = () => {},
  onFailure = () => {},
) => {
  return async dispatch => {
    try {
      const res = await updateUserAvatarService(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        onSuccess();
        console.log(res);
      }
    } catch (error) {
      console.log('Error', error);
      onFailure();
    }
  };
};
