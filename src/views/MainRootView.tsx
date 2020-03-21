import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import LoginView from './LoginView';
import HomePage from './HomePage';
import ErrorBoundary from './ErrorBoundary';

class MainRootView extends React.PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path='/login'>
              <LoginView />
            </Route>
            <Route path='/app'>
              <HomePage />
            </Route>
            <Redirect to='/app' />
          </Switch>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default MainRootView;
