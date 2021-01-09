import { SETTINGS_INITIAL_LOAD, SETTINGS_UPDATE } from '../constants';
import Storage from '../../utils/storage';

const INITIAL_STATE = {
  isDarkTheme: false,
  playSounds: true,
  showNotifications: true,
  savable: true,
};

export const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_UPDATE:
      return { ...state, [action.setting]: action.value };

    case SETTINGS_INITIAL_LOAD: {
      const storedSettings = Storage.getItem('app-settings');
      return { ...state, ...storedSettings };
    }

    default:
      return state;
  }
};
