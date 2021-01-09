import firebase from 'firebase/app';
import db from '../db';

export const fetchChats = () => {
  return db
    .collection('chats')
    .get()
    .then((snapshot) => {
      // when fetching a collection, the data is provided under snapshot.docs, aka snapshot documents
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return data;
    });
};

export const createChat = (chat) => {
  db.collection('chats')
    .add(chat)
    .then((docReference) => docReference.id);
};

export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`profiles/${chatId}`);

  await userRef.update({
    joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });
  await userRef.update({
    joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};

export const subscribeToChat = (chatid, onSubscribe) => {
  return db
    .collection('chats')
    .doc(chatId)
    .onSnapshot((snapshot) => {
      const chat = { id: snapshot.id, ...snapshot.data() };
      onSubscribe(chat);
    });
};

export const subscribeToProfile = (uid, onSubscribe) => {
  return db
    .collection('profiles')
    .doc(uid)
    .onSnapshot((snapshot) => onSubscribe(snapshot.data()));
};

export const sendChatMessage = (messageObj, chatId) => {
  db.collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(messageObj.timestamp)
    .set(messageObj);
};

export const subscribeToMessages = (chatId, onSubscribe) => {
  return db
    .collection('chats')
    .doc(chatId)
    .onSnapshot((snapshot) => onSubscribe(snapshot.docChanges()));
};
