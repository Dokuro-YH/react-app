import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { appActions } from '../actions/app';

const loginEpic = (action$, store, { WebAPI }) =>
  action$.ofType('LOGIN')
    .concatMap(({ payload }) =>
      WebAPI.login(payload)
        .map(user => appActions.loginSuccess(user))
        .catch(error => Observable.of(appActions.loginError(error))),
  );

export const appEpic = combineEpics(
  loginEpic,
);
