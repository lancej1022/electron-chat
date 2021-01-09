import * as api from '../../api/chats';
import db from '../../db';
import {
  CHATS_FETCH_SUCCESS,
  CREATE_CHAT_SUCCESS,
  CHATS_JOIN_SUCCESS,
  CHATS_FETCH_INIT,
  CHATS_SET_ACTIVE_CHAT,
  CHATS_UPDATE_USER_STATE,
  CHATS_MESSAGE_SENT,
  CHATS_SET_MESSAGES,
  CHATS_REGISTER_MESSAGE_SUB,
} from '../constants';

// will return a dispatch action
export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth; // redux thunk provides us the getState method, which allows us to pull a value out of the redux store. in this case, we destructure user from the auth state
  dispatch({ type: CHATS_FETCH_INIT });

  const chats = await api.fetchChats();
  chats.forEach((chat) => {
    chat.joinedUsers = chat.joinedUsers.map((user) => user.id);
  });

  const sortedChats = chats.reduce(
    (accumulator, chat) => {
      const chatToJoin = chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'; // determine if a user is part of the joined chats, else it is available
      accumulator[chatToJoin].push(chat);
      return accumulator;
    },
    { joined: [], available: [] }
  );

  dispatch({ type: CHATS_FETCH_SUCCESS, ...sortedChats });

  return sortedChats;
};

export const joinChat = (chat, uid) => (dispatch) => {
  return api.joinChat(uid, chat.id).then(() => dispatch({ type: CHATS_JOIN_SUCCESS, chat }));
};

export const createChat = (formData, userId) => async (dispatch) => {
  const userRef = db.doc(`profiles/${userId}`);
  const newChat = {
    ...formData,
    admin: userRef,
  };

  const chatId = await api.createChat(newChat);
  dispatch({ type: CREATE_CHAT_SUCCESS });

  // after creating a chat, make sure the creator is automatically joined
  await api.joinChat(userId, chatId);
  dispatch({ type: CHATS_JOIN_SUCCESS, chat: { ...newChat, id: chatId } });

  return chatId;
};

export const subscribeToChat = (chatId) => (dispatch) => {
  const onSubscribe = async (chat) => {
    // when we map over all the users and get the reference, we'll build up an array of promises so promise.all lets us batch them
    const joinedUsers = await Promise.all(
      chat.joinedUsers.map(async (userRef) => {
        const userSnapshot = await userRef.get();
        return userSnapshot.data();
      })
    );

    chat.joinedUsers = joinedUsers;
    dispatch({ type: CHATS_SET_ACTIVE_CHAT, chat });
  };

  return api.subscribeToChat(chatId, onSubscribe);
};

export const subscribeToProfile = (uid, chatId) => (dispatch) => {
  const onSubscribe = (uid, user) => {
    dispatch({ type: CHATS_UPDATE_USER_STATE, user, chatId });
  };

  return api.subscribeToChat(chatId, onSubscribe);
};

export const sendChatMessage = (messageObj, chatId) => (dispatch, getState) => {
  const newMessage = { ...messageObj }; // #Immutability :)

  const { user } = getState().auth;
  const userRef = db.doc(`profiles/${user.uid}`);
  newMessage.author = userRef;

  return api.sendChatMessage(newMessage, chatId).then(() => dispatch({ type: CHATS_MESSAGE_SENT }));
};

export const subscribeToMessages = (chatId) => (dispatch) => {
  const cache = {};
  const messagesWithAuthor = [];

  return api.subscribeToMessages(chatId, async (changes) => {
    const messages = changes.map((change) => {
      if (change.type === 'added') return { id: change.doc.id, ...change.doc.data() };
    });

    for await (let m of messages) {
      if (cache[m.author.id]) {
        m.author = cache[m.author.id];
      } else {
        const userSnapshot = await m.author.get();
        cache[userSnapshot.id] = userSnapshot.data();
        m.author = cache[userSnapshot.id];
        messagesWithAuthor.push(m);
      }
    }

    return dispatch({ type: CHATS_SET_MESSAGES, messages, chatId });
  });
};

export const registerMessageSubscription = (chatId, messageSub) => {
  return {
    type: CHATS_REGISTER_MESSAGE_SUB,
    sub: messageSub,
    chatId,
  };
};
