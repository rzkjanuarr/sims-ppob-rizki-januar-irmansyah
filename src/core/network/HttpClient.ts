import axios from 'axios';
import { BASE_URL } from '../common/Constant';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 12_000,
});

// JWT Token Interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
