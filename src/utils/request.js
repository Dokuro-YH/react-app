import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080' // production
    : 'http://localhost:8080', // development
});

request.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

request.interceptors.response.use(null, error => Promise.reject(error.message));

export { request };
