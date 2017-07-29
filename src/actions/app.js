import { createActions } from 'redux-actions';

export const appActions = createActions({
  LOGIN: user => user,
  LOGIN_SUCCESS: user => user,
  LOGIN_ERROR: error => error,
  LOGOUT: payload => payload,
  TOGGLE_SIDENAV: collapsed => collapsed,
  UPDATE_OPENED_KEYS: openedKeys => openedKeys,
  UPDATE_SCREEN_WIDTH: screenWidth => screenWidth,
}, 'HIDE_LOGIN_ERROR');
