import axios from 'axios';

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.baseURL = 'http://127.0.0.1:8081';
}

const request = axios.create(options);

request.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

export { request };
