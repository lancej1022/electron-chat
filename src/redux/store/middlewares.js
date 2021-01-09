import NotificationUtil from '../../utils/notification';
import { AUTH_LOGOUT_SUCCESS, SETTINGS_UPDATE } from '../constants';
import Storage from '../../utils/storage';

/**
 * General redux logic:
 * 1. action is dispatched
 * 2. any dispatched action is run through ALL middlewares where we can run side effects...
 * (although we DONT want to mutate state within a middleware -- thats what the reducer at the end is for)
 * 3. the middlewares invoke a next() function and pass along the action to any subsequent middlewares
 * 4. After all middlewares have handled the action, it will finally be passed to the reducer
 */
export const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case APP_IS_ONLINE:
    case APP_IS_OFFLINE: {
      NotificationUtil({
        title: 'Connection Status:',
        body: action.isOnline ? 'Online' : 'Offline',
      });
    }

    // handle retrieving the current settings from LS and then updating those settings
    case SETTINGS_UPDATE: {
      const { setting, value } = action;
      const currentSettings = Storage.getItem('app-settings');

      const settings = { ...currentSettings, [setting]: value };
      Storage.setItem('app-settings', settings);
    }

    case AUTH_LOGOUT_SUCCESS: {
      // messagesSubs is an object with shape of { chatRoom : functionToUnSubFromRoom }
      const { messagesSubs } = store.getState().chats;

      if (messagesSubs) {
        Object.keys(messagesSubs).forEach((sub) => {
          messagesSubs[sub](); // invoke the unsubscribe functions that we saved when accessing a room as soon as we log out
        });
      }
    }
  }

  next(action);
};
