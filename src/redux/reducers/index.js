import { combineReducers } from 'redux';
import productReducer from './productreducer';
import cartReducer from './cartreducer'; 

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
