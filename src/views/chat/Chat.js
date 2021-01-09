import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ChatUserList } from '../../components/ChatUsersList';
import { ChatMessagesList } from '../../components/ChatMessagesList';
import { ViewTitle } from '../../components/ViewTitle';
import {
  subscribeToChat,
  subscribeToProfile,
  sendChatMessage,
  subscribeToMessages,
  registerMessageSubscription,
} from '../../redux/actions/chat';
import LoadingView from '../../components/LoadingView';
import Messenger from '../../components/Messenger';

export const Chat = () => {
  const { id } = useParams(); // grab the chat ID from the route params
  const peopleWatchers = useRef({});
  const messageList = useRef({});
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messagesSub = useSelector(({ chats }) => chats.messagesSubs[id]);
  const joinedUsers = activeChat?.joinedUsers;

  const subscribeToJoinedUsers = useCallback(
    (users) => {
      users.forEach((u) => {
        if (!peoplWatchers.current[u.uid]) {
          peoplWatchers.current[u.uid] = dispatch(subscribeToProfile(u.uid, id)); // save the unsubscribe function that we get from our dispatch
        }
      });
    },
    [dispatch, id]
  );

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) => peopleWatchers.current[id]());
  }, [peopleWatchers.current]);

  const handleSubmit = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id)).then(() => {
        messageList.current.scrollIntoView(false);
      });
    },
    [id]
  );

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    if (!messagesSub) {
      const unsubFromMessages = dispatch(subscribeToMessages(id));
      dispatch(registerMessageSubscription(id, unsubFromMessages));
    }

    // cleanup on unmount
    return () => {
      unsubFromJoinedUsers();
      unsubFromChat();
    };
  }, []);

  useEffect(() => {
    if (joinedUsers) subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat..." />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle title={`Channel ${activeChat?.name}`} />
        <ChatMessagesList innerRef={messageList} messages={messages} />
        <Messenger handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
