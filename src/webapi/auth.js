import { Observable } from 'rxjs/Observable';
import { request } from '../utils/request';

export function getUser(token) {
  return Observable.fromPromise(request.get('/api/uaa/userinfo', {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  }))
    .map(response => response.data)
    .catch((error) => {
      let errmsg = error.message;
      const res = error.response;
      if (res) {
        errmsg = '服务器异常, 请联系管理员.';
        if (res.status === 401) {
          errmsg = '登录令牌已超时';
        }
      }
      return Observable.throw(errmsg);
    });
}

export function getToken({ username, password }) {
  const Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  const payload = 'grant_type=client_credentials';
  return Observable.fromPromise(request.post('/api/uaa/oauth/token', payload, {
    headers: { Authorization },
  }))
    .map(response => response.data)
    .catch((error) => {
      const res = error.response;
      if (res) {
        let errmsg = '服务器异常, 请联系管理员.';
        if (res.status === 400 || res.status === 401) {
          errmsg = '用户名或密码错误';
        }
        return Observable.throw(errmsg);
      }
      return Observable.throw(error);
    });
}

export function login(user) {
  return getToken(user)
    .mergeMap(getUser);
}
