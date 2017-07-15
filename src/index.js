import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { Router, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import RouterConfig from './router';
import App from './App';
import './index.less';

const middleware = [
  routerMiddleware(browserHistory),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(...middleware),
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <App router={<Router history={history} routes={RouterConfig} />} />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
