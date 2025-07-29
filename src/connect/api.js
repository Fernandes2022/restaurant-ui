import axios from 'axios';
import { store } from './state/store';
import { LOGOUT } from './state/auth/action-types';
import {jwtDecode} from 'jwt-decode'; 

export const API_URL = 'https://timi-restaurant-node.vercel.app';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper: check if JWT is expired
function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

// Request interceptor: attach token & check expiry
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (isTokenExpired(token)) {
      // Token expired → logout immediately
      localStorage.removeItem('token');
      store.dispatch({ type: LOGOUT });
      window.location.href = '/';
      throw new axios.Cancel('Token expired');
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      store.dispatch({ type: LOGOUT });
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
