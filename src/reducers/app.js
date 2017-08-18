import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { appActions } from '../actions/app';
import { menus, treeMenus } from '../utils/menus';

function selectCurrentMenu(regexpMenus, pathname) {
  const currentMenu = regexpMenus.find(m => m.regexp && m.regexp.exec(pathname));
  return currentMenu;
}

const initialState = {
  menus,
  treeMenus,
  loading: false,
  currentMenu: null,
  isLoginPending: false,
  isLoggedIn: false,
  loginError: null,
  token: null,
  user: null,
  collapsed: false,
  openedKeys: [],
  screenWidth: 0,
};

export const appReducer = handleActions({
  [appActions.init]: state =>
    ({
      ...state,
      loading: true,
    }),
  [appActions.initSuccess]: state =>
    ({
      ...state,
      loading: false,
    }),
  [appActions.login]: state =>
    ({
      ...state,
      isLoginPending: true,
    }),
  [appActions.loginSuccess]: (state, { payload }) =>
    ({
      ...state,
      token: payload.token,
      user: payload.user,
      isLoggedIn: true,
      isLoginPending: false,
    }),
  [appActions.loginError]: (state, { payload }) =>
    ({
      ...state,
      token: null,
      user: null,
      isLoginPending: false,
      loginError: payload,
    }),
  [appActions.logout]: state =>
    ({
      ...state,
      token: null,
      user: null,
      isLoggedIn: false,
    }),
  [appActions.toggleSidenav]: (state, { payload }) =>
    ({
      ...state,
      collapsed: payload,
    }),
  [appActions.updateOpenedKeys]: (state, { payload }) =>
    ({
      ...state,
      openedKeys: payload,
    }),
  [appActions.updateScreenWidth]: (state, { payload }) =>
    ({
      ...state,
      screenWidth: payload,
    }),
  [LOCATION_CHANGE]: (state, { payload }) => {
    const currentMenu = selectCurrentMenu(state.menus, payload.pathname);

    return ({
      ...state,
      currentMenu,
    });
  },
}, initialState);
