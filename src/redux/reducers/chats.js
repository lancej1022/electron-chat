import { CHATS_FETCH_SUCCESS } from '../constants';

const initialState = {
  items: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case action.type === CHATS_FETCH_SUCCESS:
      return { items: action.chats };

    default: {
      return state;
    }
  }
};
