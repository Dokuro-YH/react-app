import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import app, { appEpic, appListen } from './app';

function combineListens(...listens) {
  return store => listens.reduce((s, listen) => listen(s), store);
}

const rootReducer = combineReducers({
  app,
});

export const rootEpic = combineEpics(
  appEpic,
);

export const rootListens = combineListens(
  appListen,
);

export default rootReducer;
