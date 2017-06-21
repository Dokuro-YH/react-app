import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import App from './container/AppContainer';
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
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
