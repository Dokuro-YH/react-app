import { appListen } from './app';

const combineListens = (...listens) => (...args) =>
  listens.reduce((prev, listen) => {
    if (typeof listen === 'function') {
      listen(...args);
    }
    return args;
  }, args);

export const rootListener = combineListens(
  appListen,
);
