import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { createBrowserHistory as createHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import App from './containers/App';
import './index.less';

const history = createHistory();

const middleware = [
  routerMiddleware(history),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
