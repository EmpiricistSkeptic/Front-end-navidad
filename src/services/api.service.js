// src/services/api.service.js
const BASE_URL = 'https://webshots-issue-pci-cyber.trycloudflare.com/api';

const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

const request = async (endpoint, options = {}) => {
  const token = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data = null;

  try {
    data = await response.json();
  } catch (e) {
    // если ответ без body (например 204)
  }

  if (!response.ok) {
    const errorMessage =
      data?.detail ||
      data?.message ||
      'Произошла ошибка запроса';

    throw new Error(errorMessage);
  }

  return data;
};

const api = {
  get: (endpoint) =>
    request(endpoint, {
      method: 'GET',
    }),

  post: (endpoint, body = null) =>
    request(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : null,
    }),

  put: (endpoint, body = null) =>
    request(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : null,
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: 'DELETE',
    }),
};

export default api;

