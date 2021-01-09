import firebase from 'firebase/app';
import 'firebase/database';
import db from '../db';

const getOnlineStatus = (isOnline) => {
  return {
    status: isOnline ? 'online' : 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(), // store the time the user's status was last changed
  };
};

export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/profiles/${uid}`);
  return userRef.update(getOnlineStatus(isOnline));
};

export const onConnectionChanged = (onConnection) => {
  firebase
    .database()
    .ref('.info/connected') // tells us whether we are connected to firebase or not
    .on('value', (snapshot) => {
      const isConnected = snapshot?.val() ? snapshot.val() : false; // if no value, we must be disconnected so return false
      onConnection(isConnected);
    });
};
