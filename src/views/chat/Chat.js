import React from 'react';
import { useParams } from 'react-router-dom';

import { ChatUserList } from '../../components/ChatUsersList';
import { ChatMessagesList } from '../../components/ChatMessagesList';
import { ChatName } from '../../components/ChatName';

export const Chat = () => {
  const { id } = useParams();

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ChatName title={`Channel ${id}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};
