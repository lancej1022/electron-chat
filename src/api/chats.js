import db from '../db/';

export const fetchChats = () => {
  return db
    .collection('chats')
    .get()
    .then((snapshot) => {
      // when fetching a collection, the data is provided under snapshot.docs, aka snapshot documents
      const data = snapshot.docs.map((document) => document.data);

      return data;
    });
};
