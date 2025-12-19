// src/services/auth.service.js
import api from './api.service';

const ACCESS_TOKEN_KEY = 'access_token';

const login = async (username, password) => {
  const response = await api.post('/login/', {
    username,
    password,
  });

  const { access } = response;

  if (!access) {
    throw new Error('Access token не получен');
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, access);

  return response; 
};

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

const isAuthenticated = () => {
  return Boolean(getAccessToken());
};

const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const authService = {
  login,
  getAccessToken,
  isAuthenticated,
  clearToken,
};

export default authService;

