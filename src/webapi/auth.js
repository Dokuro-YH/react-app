import { request } from '../utils/request';

export function getUser(token) {
  return request.get('/api/uaa/userinfo', {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  })
    .then(({ data }) => ({ user: data }))
    .catch(({ response }) => ({ error: response }));
}

export function getToken({ username, password }) {
  const Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  const payload = 'grant_type=client_credentials';
  return request.post('/api/uaa/oauth/token', payload, {
    headers: { Authorization },
  })
    .then(({ data }) => ({ token: data }))
    .catch(({ response }) => ({ error: response }));
}
