import React from 'react';

import { JoinedChatsList } from '../../components/JoinedChatsList';
import { AvailableChatsList } from '../../components/AvailableChatsList';
import { ChatName } from '../../components/ChatName';

export const Home = () => {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList />
      </div>
      <div className="col-9 fh">
        <ChatName title={'Choose a channel'} />
        <AvailableChatsList />
      </div>
    </div>
  );
};
