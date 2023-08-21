import axios from 'axios';
import { getToken } from './token';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

request.interceptors.request.use(
  config => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error.response || error.message),
);

request.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response || error.message),
);

export default request;
