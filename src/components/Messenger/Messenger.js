import React, { useState } from 'react';

import { createTimestamp } from '../../utils/timestamp';

export const Messenger = ({ handleSubmit }) => {
  const [value, setValue] = useState('');

  const sendMessage = (message) => {
    const trimmed = message.trim();

    if (!trimmed.length) return; // if the message is empty after trimming

    const messageData = {
      content: trimmed,
      timestamp: createTimestamp(),
    };

    handleSubmit(messageData);
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      sendMessage(value);
      setValue('');
    }
  };

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        className="form-control"
        onKeyPress={handleKeyPress}
        row="3"
        placeholder="Type your message here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
