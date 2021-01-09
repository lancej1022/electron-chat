import { combineReducers } from 'redux';

import { createErrorReducer, createIsFetchingReducer } from './common';

import {
  AUTH_LOGIN_SUCCESS,
  AUTH_ON_INIT, // dispatched at start of app
  AUTH_ON_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_REGISTER_SUCCESS,
} from '../constants';

const createLoginReducer = () => {
  return combineReducers({
    isFetching: createIsFetchingReducer('AUTH_LOGIN'),
    error: createErrorReducer('AUTH_LOGIN'),
  });
};

const createRegisterReducer = () => {
  return combineReducers({
    isFetching: createIsFetchingReducer('AUTH_REGISTER'),
    error: createErrorReducer('AUTH_REGISTER'),
  });
};

export const createAuthReducer = () => {
  const user = (state = null, action) => {
    switch (action.type) {
      case AUTH_ON_INIT:
      case AUTH_ON_ERROR:
        return null;

      case AUTH_ON_SUCCESS:
        return action.user;

      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isFetching: createIsFetchingReducer('AUTH_ON'),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
};

export default createAuthReducer();
