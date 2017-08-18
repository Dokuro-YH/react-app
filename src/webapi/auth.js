import { request } from '../utils/request';

export function getUser(token) {
  return request.get('/api/uaa/userinfo', {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  })
    .then(({ data }) => data);
}

export function getToken({ username, password }) {
  const Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  const payload = 'grant_type=client_credentials';
  return request.post('/api/uaa/oauth/token', payload, {
    headers: { Authorization },
  })
    .then(({ data }) => data);
}

export function checkToken(token) {
  const payload = `token=${token.access_token}`;
  return request.post('/api/uaa/oauth/check_token', payload)
    .then(({ data }) => data);
}

export function login(payload) {
  return getToken(payload)
    .then(getUser);
}
