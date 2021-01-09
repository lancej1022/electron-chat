import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { createChat } from '../../redux/actions/chat';

export const ChatCreate = () => {
  const [register, handleSubmit] = useForm();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const onSubmit = (formData) => {
    dispatch(createChat(formData, user.uid)).then(() => history.pushState('/home'));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Create chat!</div>
          <div className="subheader">Chat with people you know!</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                ref={register}
                type="email"
                className="form-control"
                id="email"
                name="email" // Your input MUST have a name attribute for the register function from useForm to work
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                ref={register}
                name="description"
                className="form-control"
                id="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                ref={register}
                type="image"
                className="form-control"
                id="image"
                name="image" // Your input MUST have a name attribute for the register function from useForm to work
              />
            </div>
            {/* {error && <div className="alert alert-danger small">{error.message}</div>} */}
            <button type="submit" className="btn btn-outline-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
