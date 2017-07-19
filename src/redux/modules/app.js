import { createActions, handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import pathToRegexp from 'path-to-regexp';
import metaMenus from '../../utils/menus';
import { arrayToTree } from '../../utils/array';

const STORAGE_SIDENAV_COLLAPSED_KEY = 'APP/SIDENAV_COLLAPSED';

const menus = metaMenus.map(m => ({
  ...m,
  regexp: m.link && pathToRegexp(m.link),
}));

const treeMenus = arrayToTree(menus);

function selectCurrentMenu(regexpMenus, pathname) {
  const currentMenu = regexpMenus.find(m => m.regexp && m.regexp.exec(pathname));
  return currentMenu;
}

function storageSidenavCollapsed(collapsed) {
  localStorage.setItem(STORAGE_SIDENAV_COLLAPSED_KEY, JSON.stringify(collapsed));
  return collapsed;
}

function getStorageSidenavCollapsed() {
  const sidenavCollapsed = localStorage.getItem(STORAGE_SIDENAV_COLLAPSED_KEY);

  if (!sidenavCollapsed) {
    return false;
  }

  return JSON.parse(sidenavCollapsed);
}

const initialState = {
  menus,
  treeMenus,
  currentMenu: null,
  isLoginPending: false,
  isLoggedIn: true,
  collapsed: getStorageSidenavCollapsed(),
  user: { username: 'admin' },
  openedKeys: [],
  screenWidth: 0,
};

export const appActions = createActions({
  LOGIN: user => user,
  LOGIN_SUCCESS: user => user,
  LOGOUT: payload => payload,
  TOGGLE_SIDENAV: collapsed => collapsed,
  UPDATE_OPENED_KEYS: openedKeys => openedKeys,
  UPDATE_SCREEN_WIDTH: screenWidth => screenWidth,
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
    ({ ...state, user: payload, isLoggedIn: true, isLoginPending: false }),
  LOGOUT: state =>
    ({ ...state, user: null, isLoggedIn: false }),
  TOGGLE_SIDENAV: (state, { payload }) =>
    ({ ...state, collapsed: storageSidenavCollapsed(payload) }),
  UPDATE_OPENED_KEYS: (state, { payload }) =>
    ({ ...state, openedKeys: payload }),
  UPDATE_SCREEN_WIDTH: (state, { payload }) =>
    ({ ...state, screenWidth: payload }),
  [LOCATION_CHANGE]: (state, { payload }) => {
    const currentMenu = selectCurrentMenu(state.menus, payload.pathname);
    return ({ ...state, currentMenu });
  },
}, initialState);
