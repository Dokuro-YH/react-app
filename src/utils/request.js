import axios from 'axios';

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.baseURL = 'http://localhost:8080';
} else {
  options.baseURL = 'http://localhost:8080';
}

const request = axios.create(options);

request.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

export { request };
