import { combineReducers } from 'redux';

import { APP_IS_OFFLINE, APP_IS_ONLINE } from '../constants';

const createAppReducer = () => {
  const { onLine } = navigator.onLine;

  const isOnline = (state = onLine, action) => {
    switch (action.type) {
      case APP_IS_ONLINE:
      case APP_IS_OFFLINE:
        return action.isOnline;
      default:
        return state;
    }
  };

  return combineReducers({ isOnline });
};

export default createAppReducer();
