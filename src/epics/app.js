import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { appActions } from '../actions/app';

const loginEpic = (action$, store, { WebAPI }) =>
  action$.ofType('LOGIN')
    .mergeMap(({ payload }) =>
      WebAPI.login(payload)
        .map(response => appActions.loginSuccess(response.data))
        .catch(error => Observable.of(appActions.loginError(), appActions.showError(error))),
  );

export const appEpic = combineEpics(
  loginEpic,
);
