import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => { 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (formData) => api.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  update: (id, formData) => api.put(`/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => api.delete(`/users/${id}`)
};

export default api;