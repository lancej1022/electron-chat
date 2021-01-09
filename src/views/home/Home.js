import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { JoinedChatsList } from '../../components/JoinedChatsList';
import { AvailableChatsList } from '../../components/AvailableChatsList';
import { ViewTitle } from '../../components/ViewTitle';

import { fetchChats } from '../../redux/actions/chat';
import NotificationUtil from '../../utils/notification';

export const Home = () => {
  const dispatch = useDispatch();
  const availableChats = useSelector(({ chats }) => chats.available); // could also be written as (state) => state.chats.available
  const joinedChats = useSelector(({ chats }) => chats.joined);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle title={'Choose a channel'}>
          <Link className="btn btn-outline-primary" to="/chat-create">
            New
          </Link>
        </ViewTitle>
        <AvailableChatsList chats={chats} />
      </div>
    </div>
  );
};
