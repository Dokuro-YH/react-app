import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { appReducer as app } from './app';

export const rootReducer = combineReducers({
  app,
  router,
});
