import React from 'react';
import { Spin } from 'antd';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { createBrowserHistory as createHistory } from 'history';
import { createHashHistory as createHistory } from 'history'; // use in gh-pages
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './containers/App';
import { configureStore } from './redux';
import AsyncComponent from './components/AsyncComponent';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = configureStore();

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
