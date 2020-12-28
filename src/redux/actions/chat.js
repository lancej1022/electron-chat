import * as api from '../../api/chats';
import { CHATS_FETCH_SUCCESS } from '../constants';

export const fetchChats = (dispatch) => {
  api.fetchChats().then((chats) =>
    dispatch({
      type: CHATS_FETCH_SUCCESS,
      chats,
    })
  );
};
