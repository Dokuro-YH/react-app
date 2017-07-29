import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { createBrowserHistory as createHistory } from 'history';
import { createHashHistory as createHistory } from 'history'; // use in gh-pages

import { configureStore } from './store';
import Router from './routes';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
