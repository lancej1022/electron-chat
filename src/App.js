import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Home } from './views/home';
import { Chat } from './views/chat';
import { Settings } from './views/settings';
import { Welcome } from './views/welcome';
import ChatCreate from './views/chatCreate';
import LoadingView from './components/LoadingView';

import { listenToAuthChanges } from './redux/actions/auth';
import { checkUserConnection } from './redux/actions/connection';
import { listenToConnectionChanges } from './redux/actions/app';
import { loadInitialSettings } from './redux/actions/settings';

/**
 * Checks authentication status and redirects to the Welcome screen if a user is not authenticated
 */
const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);
  const onlyChild = React.Children.only(children); // enforces that this component can only wrap a single child (such as <Home />), otherwise will throw an error

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? React.cloneElement(onlyChild, { ...rest, ...props }) : <Redirect to="/" />
      }
    />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(({ auth }) => auth.isFetching);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unSubFromAuth = dispatch(listenToAuthChanges()); // on every dispatch/state change, listen to auth state changes, and store the returned unSub function for cleanup when component dismounts
    const unSubFromConnection = dispatch(listenToConnectionChanges());

    // clean up listeners
    return () => {
      unSubFromAuth();
      unSubFromConnection();
      unsubFromUserConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection = null;
    if (user?.uid) unsubFromUserConnection = dispatch(checkUserConnection(user.uid));

    return () => {
      if (unsubFromUserConnection) unsubFromUserConnection();
    };
  }, [dispatch, user]);

  if (isFetching) {
    return <LoadingView />;
  }

  if (!isOnline) {
    return (
      <LoadingView message="Application has lost its connection to the internet. Please check your internet connection." />
    );
  }

  return (
    <Router>
      <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>
        {/* {user && <Navbar />}  COME BACK TO THIS WHEN YOU REFACTOR THE NAVBAR TO GET STATE FROM REDUX OR REACT-ROUTER URL SO YOU DONT NEED <BaseLayout /> in each View */}
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <AuthRoute exact path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute>
            <ChatCreate path="/chat-create" />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <Chat />
          </AuthRoute>
          <AuthRoute path="/home">
            <Home />
          </AuthRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
