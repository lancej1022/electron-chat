import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { AUTH_LOGOUT_SUCCESS } from '../constants';

import { chatReducer, authReducer, appReducer, settingsReducer } from '../reducers';
import { appMiddleware } from './middlewares';

/**
 * General redux logic:
 * 1. action is dispatched
 * 2. any dispatched action is run through ALL middlewares where we can run side effects...
 * (although we DONT want to mutate state within a middleware -- thats what the reducer at the end is for)
 * 3. the middlewares invoke a next() function and pass along the action to any subsequent middlewares
 * 4. After all middlewares have handled the action, it will finally be passed to the reducer
 */
const configureStore = () => {
  // middlewares will be invoked on EACH action that is dispatched
  const middlewares = [thunkMiddleware, appMiddleware];

  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer, // for determining if the app is connected to the internet via an isOnline boolean
    settings: settingsReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === AUTH_LOGOUT_SUCCESS) {
      // reset the state when we logout UNLESS the state is meant to be saved, such as settings (see settings.js reducer)
      Object.keys(state).forEach((stateKey) => {
        if (state[stateKey].savable) return;
        state[stateKey] = {};
      });
    }

    return mainReducer(state, action);
  };

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
};

export default configureStore;
