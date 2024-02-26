// import {
//   FETCH_USERS_REQUEST,
//   FETCH_USERS_SUCCESS,
//   FETCH_USERS_FAILURE,
//   UPDATE_CURRENT_PAGE,
//   FETCH_USER_REQUEST,
//   FETCH_USER_SUCCESS,
//   FETCH_USER_FAILURE,
//   CREATE_USER_REQUEST,
//   CREATE_USER_SUCCESS,
//   CREATE_USER_FAILURE,
//   UPDATE_USER_REQUEST,
//   UPDATE_USER_SUCCESS,
//   UPDATE_USER_FAILURE,
//   DELETE_USER_REQUEST,
//   DELETE_USER_SUCCESS,
//   DELETE_USER_FAILURE,
// } from '../actions/mock-api-action';

// const initialState = {
//   loading: false,
//   users: [],
//   error: '',
//   currentPage: 1,
//   usersPerPage: 6,
// };

// const mockApiReducer = (state = initialState, action) => {
//   switch (action.type) {

//     //Request
//     case FETCH_USERS_REQUEST:
//     case FETCH_USER_REQUEST:
//     case CREATE_USER_REQUEST:
//     case UPDATE_USER_REQUEST:
//     case DELETE_USER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     //Success
//     case FETCH_USERS_SUCCESS:
//     case FETCH_USER_SUCCESS:
//     case CREATE_USER_SUCCESS:
//     case UPDATE_USER_SUCCESS:
//     case DELETE_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: action.payload,
//         error: '',
//       };

//     //Failure
//     case FETCH_USERS_FAILURE:
//     case FETCH_USER_FAILURE:
//     case CREATE_USER_FAILURE:
//     case UPDATE_USER_FAILURE:
//     case DELETE_USER_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         users: [],
//         error: action.payload,
//       };

//     //Update Page
//     case UPDATE_CURRENT_PAGE:
//       return {
//         ...state,
//         currentPage: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default mockApiReducer;
