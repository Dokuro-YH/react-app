import * as types from '../constants/app';

export const login = user => ({ type: types.LOGIN, user });
export const logout = () => ({ type: types.LOGOUT });
export const toggleSidenav = collapsed => ({ type: types.TOGGLE_SIDENAV, collapsed });
export const updateSelectedKeys = selectedKeys => ({
  type: types.UPDATE_SELECTED_KEYS,
  selectedKeys,
});
export const updateOpenedKeys = openedKeys => ({
  type: types.UPDATE_OPENED_KEYS,
  openedKeys,
});
