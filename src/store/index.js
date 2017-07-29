import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from '../reducers';
import { rootEpic } from '../epics';
import { rootListens } from '../listens';
import * as WebAPI from '../webapi';

export function configureStore(history) {
  const middleware = [
    routerMiddleware(history),
    createEpicMiddleware(rootEpic, {
      dependencies: { WebAPI },
    }),
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

  rootListens(store, history);

  return store;
}
