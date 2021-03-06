import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinChat } from '../../redux/actions/chat';

export const AvailableChatsList = ({ chats }) => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  const getConfirmation = (chat) => {
    const bool = window.confirm(`Do you want to join ${chat.name}?`);

    if (bool === true) {
      dispatch(joinChat(chat, user.uid));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        {chats.length === 0 && (
          <div className="container-fluid">
            <div className="alert alert-warning">No chats to join :(</div>
          </div>
        )}
        {chats.map((chat) => (
          <div key={chat.id} className="col-lg-3 col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{chat.name}</h5>
                <p className="card-text">{chat.description}</p>
                <button onClick={getConfirmation} className="btn btn-outline-primary">
                  Join Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
