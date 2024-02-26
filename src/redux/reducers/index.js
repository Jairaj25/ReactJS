import { combineReducers } from 'redux';
import productReducer from './productreducer';
import cartReducer from './cartreducer'; 
import mockApiSlice from "../actions/mock-api-action";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  mockApi: mockApiSlice
});

export default rootReducer;
