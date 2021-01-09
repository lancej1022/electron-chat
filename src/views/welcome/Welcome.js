import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

export const Welcome = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const user = useSelector(({ auth }) => auth.user);

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">
          {isLoginView ? "Don't have an account?" : 'Already registered?'}
          <span onClick={() => setIsLoginView(!isLoginView)} className="btn-link ml-2">
            {isLoginView ? 'Register' : 'Login'}
          </span>
        </small>
      </div>
    </div>
  );
};
