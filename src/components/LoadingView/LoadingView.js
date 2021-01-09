import React from 'react';
import { useSelector } from 'react-redux';

import './LoadingView.scss';

export const LoadingView = ({ message = 'Loading...' }) => {
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      <div className="loading-screen">
        <div className="loading-view">
          <div className="loading-view-container">
            <div className="mb-3">{message}</div>
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
