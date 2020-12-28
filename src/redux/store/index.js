import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { chatReducer } from '../reducers';

export default configureStore = () => {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    combineReducers({ chats: chatReducer }),
    applyMiddleware(...middlewares)
  );

  return store;
};
