import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import ScrollToTop from './components/ScrollToTop';
import AppContainer from './containers/App';
import Dashboard from './containers/Dashboard';
import Users from './containers/Users';
import Teams from './containers/Teams';

const Router = props => (
  <ConnectedRouter {...props}>
    <ScrollToTop>
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/users" component={Users} />
          <Route path="/teams" component={Teams} />
        </Switch>
      </AppContainer>
    </ScrollToTop>
  </ConnectedRouter>
);

export default Router;
