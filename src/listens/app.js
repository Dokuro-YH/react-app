import { appActions } from '../actions/app';

export const appListen = (store) => {
  store.dispatch(appActions.init());
  // TODO window.resize listen
};
