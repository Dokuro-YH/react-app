import { createActions } from 'redux-actions';

export const appActions = createActions({
  APP: {
    INIT: payload => payload,
    INIT_SUCCESS: payload => payload,
    LOGIN: credentials => credentials,
    LOGIN_SUCCESS: token => token,
    LOGIN_ERROR: error => error,
    LOGOUT: payload => payload,
    TOGGLE_SIDENAV: collapsed => collapsed,
    UPDATE_OPENED_KEYS: openedKeys => openedKeys,
    UPDATE_SCREEN_WIDTH: screenWidth => screenWidth,
  },
}).app;
