import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import watchApp from './app';
import loginFlow from './loginFlow';

export const effectsMiddleware = createSagaMiddleware();

export function* rootEffects() {
  yield all([
    watchApp(),
    loginFlow(),
  ]);
}
