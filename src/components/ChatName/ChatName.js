import React from 'react';

export const ChatName = ({ title }) => {
  return (
    <div className="chat-name-container">
      <span className="name">{title}</span>
    </div>
  );
};
