import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from './reducers';
import { effectsMiddleware, rootEffects } from './effects';
import { rootListener } from './listens';
// import * as WebAPI from './webapi';

export default function configureStore(history) {
  const middleware = [
    routerMiddleware(history),
    effectsMiddleware,
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

  effectsMiddleware.run(rootEffects);

  rootListener(store, history);

  return store;
}
