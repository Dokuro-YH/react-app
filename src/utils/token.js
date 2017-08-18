import { storeItem, getItem, removeItem } from './helpers';

export const TOKEN_KEY = 'TOKEN';

export const tokenCache = {
  getToken: () => getItem(TOKEN_KEY),
  storeToken: (token) => {
    storeItem(TOKEN_KEY, token);
  },
  clearToken: () => {
    removeItem(TOKEN_KEY);
  },
};
