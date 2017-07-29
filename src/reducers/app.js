import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import pathToRegexp from 'path-to-regexp';
import metaMenus from '../utils/menus';
import { arrayToTree } from '../utils/array';

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
  isLoggedIn: false,
  user: null,
  collapsed: getStorageSidenavCollapsed(),
  openedKeys: [],
  screenWidth: 0,
  errmsg: null,
};

export const appReducer = handleActions({
  LOGIN: state =>
    ({ ...state, isLoginPending: true }),
  LOGIN_SUCCESS: (state, { payload }) =>
    ({ ...state, user: payload, isLoggedIn: true, isLoginPending: false }),
  LOGIN_ERROR: state =>
    ({ ...state, isLoginPending: false }),
  LOGOUT: state =>
    ({ ...state, user: null, isLoggedIn: false }),
  TOGGLE_SIDENAV: (state, { payload }) =>
    ({ ...state, collapsed: storageSidenavCollapsed(payload) }),
  UPDATE_OPENED_KEYS: (state, { payload }) =>
    ({ ...state, openedKeys: payload }),
  UPDATE_SCREEN_WIDTH: (state, { payload }) =>
    ({ ...state, screenWidth: payload }),
  SHOW_ERROR: (state, { payload }) =>
    ({ ...state, errmsg: payload }),
  HIDE_ERROR: state =>
    ({ ...state, errmsg: null }),
  [LOCATION_CHANGE]: (state, { payload }) => {
    const currentMenu = selectCurrentMenu(state.menus, payload.pathname);
    return ({ ...state, currentMenu });
  },
}, initialState);
