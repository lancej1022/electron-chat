import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JoinedChatsList } from '../../components/JoinedChatsList';
import { AvailableChatsList } from '../../components/AvailableChatsList';
import { ChatName } from '../../components/ChatName';

import { fetchChats } from '../../redux/actions/chat';

export const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items); // could also be written as ({chats} => chats.items)

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ChatName title={'Choose a channel'} />
        <AvailableChatsList chats={chats} />
      </div>
    </div>
  );
};
