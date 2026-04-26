import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized: clear token and redirect to login if necessary
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export const helpService = {
  getAllRequests: async () => {
    const response = await api.get('/requests');
    return response.data;
  },
  getMyRequests: async () => {
    const response = await api.get('/requests/my');
    return response.data;
  },
  createRequest: async (requestData) => {
    const response = await api.post('/requests', requestData);
    return response.data;
  },
  acceptRequest: async (id) => {
    const response = await api.put(`/requests/${id}/accept`);
    return response.data;
  },
  completeRequest: async (id) => {
    const response = await api.put(`/requests/${id}/complete`);
    return response.data;
  },
  deleteRequest: async (id) => {
    await api.delete(`/requests/${id}`);
  }
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  updateLocation: async (location) => {
    const response = await api.put('/users/me/location', location);
    return response.data;
  }
};

export const feedbackService = {
  createFeedback: async (feedback) => {
    const response = await api.post('/feedback', feedback);
    return response.data;
  },
  getUserFeedbacks: async (userId) => {
    const response = await api.get(`/feedback/user/${userId}`);
    return response.data;
  }
};

export const messageService = {
  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
  getMessages: async (requestId) => {
    const response = await api.get(`/messages/request/${requestId}`);
    return response.data;
  }
};

export default api;
