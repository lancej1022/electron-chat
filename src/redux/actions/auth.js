import * as api from '../../api/auth';
import {
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  CHATS_FETCH_RESET,
} from '../constants';

// The functions in this file return dispatch actions

export const registerUser = (formData) => (dispatch) => {
  dispatch({ type: AUTH_REGISTER_INIT });

  return (
    api
      .registerUser(formData)
      // .then(() => dispatch({ type: AUTH_REGISTER_SUCCESS, user: {} }))
      .catch((error) => dispatch({ type: AUTH_REGISTER_ERROR, error }))
  );
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: AUTH_LOGIN_INIT });

  return (
    api
      .login(formData)
      // .then(() => dispatch({ type: AUTH_LOGIN_SUCCESS, user: {} }))
      .catch((error) => dispatch({ type: AUTH_LOGIN_ERROR, error }))
  );
};

export const logout = () => (dispatch) => {
  return api.logout().then(() => {
    dispatch({ type: AUTH_LOGOUT_SUCCESS });
    dispatch({ type: CHATS_FETCH_RESET }); // will wipe out the avail/joined chats on logout, so if a user logs in with a different account they wont briefly see the previous users chats
  });
};

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: AUTH_ON_INIT });

  // returns an Unsubscribe function that we can use to stop listening to auth state changes
  return api.onAuthStateChange(async (authUser) => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid);
      dispatch({ type: AUTH_ON_SUCCESS, user: userProfile });
    } else {
      dispatch({ type: AUTH_ON_ERROR });
    }
  });
};
