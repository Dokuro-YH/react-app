import * as types from '../constants/app';
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

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, user: action.user, isLoggedIn: true };
    case types.LOGOUT:
      return { ...state, user: null, isLoggedIn: false };
    case types.TOGGLE_SIDENAV:
      return {
        ...state,
        collapsed: action.collapsed,
      };
    case types.UPDATE_SELECTED_KEYS:
      return {
        ...state,
        selectedKeys: action.selectedKeys,
      };
    case types.UPDATE_OPENED_KEYS:
      return {
        ...state,
        openedKeys: action.openedKeys,
      };
    default:
      return state;
  }
};
