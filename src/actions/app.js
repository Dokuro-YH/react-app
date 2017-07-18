import { createActions } from 'redux-actions';

export default createActions({
  LOGIN: user => ({ user }),
  LOGOUT: () => ({ user: null }),
  TOGGLE_SIDENAV: collapsed => ({ collapsed }),
  UPDATE_SELECTED_KEYS: selectedKeys => ({ selectedKeys }),
  UPDATE_OPENED_KEYS: openedKeys => ({ openedKeys }),
});
