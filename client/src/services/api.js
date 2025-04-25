// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Use env variable or default
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptor to handle token expiration or other errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Example: Handle unauthorized access, maybe force logout
      // You might dispatch a logout action from your AuthContext here
      console.log('Unauthorized, logging out');
      // Avoid direct state manipulation here, better to call a logout function from context if possible
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // Force redirect
    }
    return Promise.reject(error);
  }
);

export default api;