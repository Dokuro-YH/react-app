import { take, put, call } from 'redux-saga/effects';
import { appActions } from '../actions/app';
import { tokenCache } from '../utils/token';
import { WebApi } from '../webapi';

export function* watchApp() {
  yield take(appActions.init);
  const token = yield call(tokenCache.getToken);
  if (token) {
    try {
      yield call(WebApi.checkToken, token);
      const user = yield call(WebApi.getUser, token);
      yield put(appActions.loginSuccess({ token, user }));
    } catch (error) { /* ignore */ }
  }
  yield put(appActions.initSuccess());
}
