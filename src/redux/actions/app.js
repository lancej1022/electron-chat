import { APP_IS_ONLINE, APP_IS_OFFLINE } from '../constants';

const onStatusChange = (dispatch) => {
  const isOnline = navigator.onLine; // returns true/false based on whether app can reach internet connection

  const action = navigator.onLine
    ? { type: APP_IS_ONLINE, isOnline }
    : { type: APP_IS_OFFLINE, isOnline };

  dispatch(action);
};

// whenever the app goes online/offline, execute the onStatusChange function
export const listenToConnectionChanges = () => (dispatch) => {
  const connectionHandler = onStatusChange(dispatch);

  window.addEventListener('online', connectionHandler);
  window.addEventListener('offline', connectionHandler);

  return () => {
    window.removeEventListener('online', connectionHandler);
    window.removeEventListener('offline', connectionHandler);
  };
};
