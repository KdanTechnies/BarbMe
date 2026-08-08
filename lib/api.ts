import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// AUTO-AUTH INTERCEPTOR
// This runs before every request. If a token exists, it adds "Bearer <token>"
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('bm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// AUTO-LOGOUT INTERCEPTOR
// If the backend says "401 Unauthorized" (token expired), this logs the user out automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bm_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);