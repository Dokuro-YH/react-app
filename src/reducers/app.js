import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import { appActions } from '../actions/app';
import { menus, treeMenus } from '../utils/menus';

const STORAGE_SIDENAV_COLLAPSED_KEY = 'APP/SIDENAV_COLLAPSED';

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
  isLoggedIn: false,
  loginError: null,
  user: null,
  collapsed: getStorageSidenavCollapsed(),
  openedKeys: [],
  screenWidth: 0,
};

export const appReducer = handleActions({
  [appActions.login]: state =>
    ({ ...state, isLoginPending: true }),
  [appActions.loginSuccess]: (state, { payload }) =>
    ({ ...state, user: payload, isLoggedIn: true, isLoginPending: false }),
  [appActions.loginError]: (state, { payload }) =>
    ({ ...state, isLoginPending: false, loginError: payload }),
  [appActions.logout]: state =>
    ({ ...state, user: null, isLoggedIn: false }),
  [appActions.toggleSidenav]: (state, { payload }) =>
    ({ ...state, collapsed: storageSidenavCollapsed(payload) }),
  [appActions.updateOpenedKeys]: (state, { payload }) =>
    ({ ...state, openedKeys: payload }),
  [appActions.updateScreenWidth]: (state, { payload }) =>
    ({ ...state, screenWidth: payload }),
  [LOCATION_CHANGE]: (state, { payload }) => {
    const currentMenu = selectCurrentMenu(state.menus, payload.pathname);
    return ({ ...state, currentMenu });
  },
}, initialState);
