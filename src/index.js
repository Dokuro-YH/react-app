import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { createBrowserHistory as createHistory } from 'history';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import { Spin } from 'antd';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import App from './containers/App';
import AsyncComponent from './components/AsyncComponent';

const history = createHistory();

const middleware = [
  routerMiddleware(history),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.NODE_ENV === 'production' ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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

const Loading = (<div className="loading"><Spin tip="正在加载..." /></div>);

const Dashboard = () => (<AsyncComponent load={() => import('./containers/Dashboard.js')} loading={Loading} />);
const Users = () => (<AsyncComponent load={() => import('./containers/Users.js')} loading={Loading} />);
const Teams = () => (<AsyncComponent load={() => import('./containers/Teams.js')} loading={Loading} />);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/users" component={Users} />
          <Route path="/teams" component={Teams} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
