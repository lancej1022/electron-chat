import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDw-i0bXRtUbLiBXJY4KaY7M29JW-1lfuc',
  authDomain: 'electron-chat-5ad82.firebaseapp.com',
  projectId: 'electron-chat-5ad82',
  storageBucket: 'electron-chat-5ad82.appspot.com',
  messagingSenderId: '36849341379',
  appId: '1:36849341379:web:c27623fee1b57b79f06376',
  measurementId: 'G-NL1NRBVQS4',
};

export const { Timestamp } = firebase.firestore;

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig).firestore();
// firebase.analytics();
