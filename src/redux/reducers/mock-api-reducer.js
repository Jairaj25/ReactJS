// src/redux/reducers/mockApiReducer.js
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions/mock-api-action';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const mockApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.slice(0, 5), // Only take the first 5 users
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mockApiReducer;
