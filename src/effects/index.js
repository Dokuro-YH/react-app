import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { watchAndLog } from './watchAndLog';
import { loginFlow } from './loginFlow';

export const effectsMiddleware = createSagaMiddleware();

export function* rootEffects() {
  yield all([
    watchAndLog(),
    loginFlow(),
  ]);
}
