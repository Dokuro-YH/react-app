import { handleActions } from 'redux-actions';
import { menus, treeMenu } from '../utils/menu';

const initialState = {
  menus,
  treeMenu,
  isLoggedIn: true,
  collapsed: false,
  user: { username: 'admin' },
  selectedKeys: [],
  openedKeys: [],
};

export default handleActions({
  LOGIN: (state, { payload }) =>
    ({ ...state, ...payload, isLoggedIn: true }),
  LOGOUT: (state, { payload }) =>
    ({ ...state, ...payload, isLoggedIn: false }),
  TOGGLE_SIDENAV: (state, { payload }) =>
    ({ ...state, ...payload }),
  UPDATE_SELECTED_KEYS: (state, { payload }) =>
    ({ ...state, ...payload }),
  UPDATE_OPENED_KEYS: (state, { payload }) =>
    ({ ...state, ...payload }),
}, initialState);
