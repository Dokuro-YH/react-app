import { all, take, put, call } from 'redux-saga/effects';
import { appActions } from '../actions/app';
import { tokenCache } from '../utils/token';
import { WebApi } from '../webapi';

export function* watchInitial() {
  yield take(appActions.init);
  const token = yield call(tokenCache.getToken);
  if (token) {
    try {
      yield call(WebApi.checkToken, token);
      const user = yield call(WebApi.getUser, token);
      yield put(appActions.loginSuccess({ token, user }));
    } catch (error) {
      yield call(tokenCache.clearToken);
    }
  }
  yield put(appActions.initSuccess());
}

export default function* watchApp() {
  yield all([
    watchInitial(),
  ]);
}
