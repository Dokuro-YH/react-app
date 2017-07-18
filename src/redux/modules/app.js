import { createActions, handleActions } from 'redux-actions';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { menus, treeMenu } from '../../utils/menu';

const initialState = {
  menus,
  treeMenu,
  isLoginPending: false,
  isLoggedIn: false,
  collapsed: false,
  user: null,
  selectedKeys: [],
  openedKeys: [],
  screenWidth: 0,
};

export const appActions = createActions({
  LOGIN: user => user,
  LOGIN_SUCCESS: user => ({ user }),
  LOGOUT: () => ({ user: null }),
  TOGGLE_SIDENAV: collapsed => ({ collapsed }),
  UPDATE_SELECTED_KEYS: selectedKeys => ({ selectedKeys }),
  UPDATE_OPENED_KEYS: openedKeys => ({ openedKeys }),
  UPDATE_SCREEN_WIDTH: screenWidth => ({ screenWidth }),
});

const LoginAPI = user =>
  Observable.of(user).delay(1000);

export const appEpic = combineEpics(
  action$ =>
    action$.ofType('LOGIN')
      .mergeMap(action => LoginAPI(action.payload)
        .map(response => appActions.loginSuccess(response))),
);

export const appListen = (store) => {
  Observable.fromEvent(window, 'resize')
    .debounceTime(1000)
    .mapTo(document.body.clientWidth)
    .map(appActions.updateScreenWidth)
    .subscribe(store.dispatch);
};

export default handleActions({
  LOGIN: state =>
    ({ ...state, isLoginPending: true }),
  LOGIN_SUCCESS: (state, { payload }) =>
    ({ ...state, ...payload, isLoggedIn: true, isLoginPending: false }),
  LOGOUT: (state, { payload }) =>
    ({ ...state, ...payload, isLoggedIn: false }),
  TOGGLE_SIDENAV: (state, { payload }) =>
    ({ ...state, ...payload }),
  UPDATE_SELECTED_KEYS: (state, { payload }) =>
    ({ ...state, ...payload }),
  UPDATE_OPENED_KEYS: (state, { payload }) =>
    ({ ...state, ...payload }),
  UPDATE_SCREEN_WIDTH: (state, { payload }) =>
    ({ ...state, ...payload }),
}, initialState);
