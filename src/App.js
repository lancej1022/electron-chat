import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/home';
import { Settings } from './views/settings';
import { Login } from './views/login';
import { Register } from './views/register';
import { Navbar } from './components/Navbar';
import { Chat } from './views/chat';

const App = () => {
  return (
    <Router>
      <div className="content-wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/chat/:id">
            <Chat />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
