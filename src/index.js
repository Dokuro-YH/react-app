import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
// import { createHashHistory as createHistory } from 'history'; // use in gh-pages

import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import './style/index.less';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
