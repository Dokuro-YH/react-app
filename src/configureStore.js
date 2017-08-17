import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from './reducers';
import { rootListener } from './listens';
// import * as WebAPI from './webapi';

export default function configureStore(history) {
  const middleware = [
    routerMiddleware(history),
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );

  rootListener(store, history);

  return store;
}
