import * as api from '../../api/connection';
import { CONNECTION_USER_STATUS_CHANGED } from '../constants';

export const checkUserConnection = (uid) => (dispatch) => {
  const onChange = (isConnected) => {
    api.setUserOnlineStatus(uid, isConnected);
    dispatch({ type: CONNECTION_USER_STATUS_CHANGED });
  };

  api.onConnectionChanged(onChange);
};
