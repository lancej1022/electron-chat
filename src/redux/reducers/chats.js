import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  CHATS_FETCH_SUCCESS,
  CHATS_FETCH_RESET,
  CHATS_JOIN_SUCCESS,
  CHATS_SET_ACTIVE_CHAT,
  CHATS_UPDATE_USER_STATE,
  CHATS_SET_MESSAGES,
  CHATS_REGISTER_MESSAGE_SUB,
} from '../constants';

const initialState = {
  items: [],
};

export const createChatReducer = () => {
  const joined = (state = [], action) => {
    switch (action.type) {
      case CHATS_FETCH_RESET:
        return [];
      case CHATS_FETCH_SUCCESS:
        return action.joined;
      case CHATS_JOIN_SUCCESS:
        return [...state, action.chat];

      default:
        return state;
    }
  };

  const available = (state = [], action) => {
    switch (action.type) {
      case CHATS_FETCH_RESET:
        return [];
      case CHATS_FETCH_SUCCESS:
        return action.available;
      case CHATS_JOIN_SUCCESS:
        return state.filter((chat) => chat.id !== action.chat.id); // return all chats w/ a different id from the one we just joined

      default:
        return state;
    }
  };

  const activeChats = createReducer(
    {},
    {
      CHATS_SET_ACTIVE_CHAT: (state, action) => {
        const { chat } = action;
        state[chat.id] = chat; // normally we dont want to mutate state, but RTK uses Immer to automatically handle it for us
      },
      CHATS_UPDATE_USER_STATE: (state, action) => {
        const { user, chatId } = action;
        const joinedUsers = state[chatId].joinedUsers;
        const index = joinedUsers.findIndex((u) => u.id === user.id);

        // if user was not found OR user state was the same as before
        if (index < 0 || joinedUsers[index].state === user.state) return state;

        joinedUsers[index].state = user.state;
      },
    }
  );

  const messages = createReducer(
    {},
    {
      CHATS_SET_MESSAGES: (state, action) => {
        const prevMessages = state[action.chatId] || [];
        state[action.chatId] = [...prevMessages, ...action.messages];
      },
    }
  );

  const messagesSubs = (state = {}, action) => {
    switch (action.type) {
      case CHATS_REGISTER_MESSAGE_SUB:
        return { ...state, [action.chatId]: action.sub };
      default:
        return state;
    }
  };

  return combineReducers({ joined, available, activeChats, messages, messagesSubs });
};
