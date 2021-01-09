import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatPastTime } from '../../utils/timestamp';

export const ChatMessagesList = ({ messages = [], innerRef }) => {
  const user = useSelector(({ auth }) => auth.user);

  const isAuthorClassname = useCallback(
    (message) => {
      return message?.author.uid === user.uid ? 'chat-right' : 'chat-left';
    },
    [user]
  );

  return (
    <div className="chat-container">
      <ul ref={innerRef} className="chat-box chatContainerScroll">
        {messages.map((m) => {
          return (
            <li key={m.id} className={isAuthorClassname(m)}>
              <div className="chat-avatar">
                <img src={m.author?.avatar} alt="Retail Admin" />
                <div className="chat-name">Test User 1</div>
              </div>
              <div className="chat-text-wrapper">
                <span className="chat-text">{m.content}</span>
                <span className="chat-spacer" />
                <div className="chat-hour">{formatPastTime(m.timestamp)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMessagesList;
