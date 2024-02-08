import { combineReducers } from 'redux';
import productReducer from './productreducer';
import cartReducer from './cartreducer'; 
import mockApiReducer from './mock-api-reducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  mockApi: mockApiReducer
});

export default rootReducer;
