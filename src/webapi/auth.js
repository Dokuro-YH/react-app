import { Observable } from 'rxjs/Observable';
import { request } from '../utils/request';

export function login({ username, password }) {
  const payload = `username=${username}&password=${password}`;
  return Observable.fromPromise(request.post('/api/login', payload))
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
