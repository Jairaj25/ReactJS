import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

const baseUrl = "https://65c5339adae2304e92e40df5.mockapi.io/mockapi/v1/Users";

// Fetch all users
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response = await axios.get(baseUrl);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

// Update current page (custom function)
export const updateCurrentPage = (pageNumber) => {
  return {
    type: UPDATE_CURRENT_PAGE,
    payload: pageNumber,
  };
};

// Fetch user by ID
export const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
      const response = await axios.get(`${baseUrl}/${userId}`);
      dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
    }
  };
};

// Create user
export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const response = await axios.post(baseUrl, userData);
      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Update user by ID
export const updateUser = (userId, userData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const response = await axios.put(`${baseUrl}/${userId}`, userData);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Delete user by ID
export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      await axios.delete(`${baseUrl}/${userId}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };
};