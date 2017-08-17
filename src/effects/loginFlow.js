import { take, put, call } from 'redux-saga/effects';
import { appActions } from '../actions/app';
import { WebApi } from '../webapi';

export function* loginFlow() {
  for (; ;) {
    const { payload } = yield take(appActions.login);
    const ret = yield call(WebApi.getToken, payload);
    if (ret.token) {
      const { user, error } = yield call(WebApi.getUser, ret.token);

      if (user) {
        yield put(appActions.loginSuccess(user));
      } else {
        yield put(appActions.loginError(error));
      }
    } else {
      yield put(appActions.loginError(ret.error));
    }
  }
}
