import { all, take, put, call } from 'redux-saga/effects';
import { appActions } from '../actions/app';
import { WebApi } from '../webapi';
import { tokenCache } from '../utils/token';

export function* watchLogout() {
  for (; ;) {
    yield take(appActions.logout);
    yield call(tokenCache.clearToken);
  }
}

export function* watchLogin() {
  for (; ;) {
    const { payload } = yield take(appActions.login);
    try {
      const token = yield call(WebApi.getToken, payload);
      yield call(tokenCache.storeToken, token);

      const user = yield call(WebApi.getUser, token);
      yield put(appActions.loginSuccess({ token, user }));
    } catch (error) {
      yield put(appActions.loginError(error));
    }
  }
}

export default function* loginFlow() {
  yield all([
    watchLogin(),
    watchLogout(),
  ]);
}
