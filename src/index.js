import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
// import { createHashHistory as createHistory } from 'history'; // use in gh-pages

import TriangleCanvas from './components/TriangleCanvas';
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
      <div className="full-height">
        <Route path="/" component={MainLayout} />
        <Route path="/login" component={LoginLayout} />
        <Route path="/login" component={TriangleCanvas} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
