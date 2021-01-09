import { SETTINGS_UPDATE, SETTINGS_INITIAL_LOAD } from '../constants';

export const updateSettings = (setting, value) => {
  return {
    type: SETTINGS_UPDATE,
    setting,
    value,
  };
};

export const loadInitialSettings = () => {
  return {
    type: SETTINGS_INITIAL_LOAD,
  };
};
