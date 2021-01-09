import firebase from 'firebase/app';
import 'firebase/auth';

import db from '../db';

// REVIEW: make sure the collection is correctly titled 'profiles' in firebase
const createUserProfile = (userProfile) => {
  return db.collection('profiles').doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = (uid) => {
  return db
    .collection('profiles')
    .doc(uid)
    .get()
    .then((snapshot) => snapshot.data());
};

export const registerUser = async ({ email, password, username, avatar }) => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await createUserProfile({ uid: user.uid, username, email, avatar, joinedChats: [] });
};

export const login = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => firebase.auth().signOut();

// will return the user from firebase
export const onAuthStateChange = (onAuth) => firebase.auth().onAuthStateChanged(onAuth);
