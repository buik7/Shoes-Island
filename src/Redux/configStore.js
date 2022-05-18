import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';
import storeReducer from './reducers/storeReducer';
import categoryReducer from './reducers/categoryReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  storeReducer,
  categoryReducer,
  cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
