import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

// Create an Axios instance with JWT interceptor
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Get JWT token from local storage
    const token = localStorage.getItem('token');
    
    // If JWT token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export Axios instance for making API requests
export const api = axiosInstance;

// Define API endpoints
export const signinEndpoint = `${API_BASE_URL}/signin`;
export const signupEndpoint = `${API_BASE_URL}/signup`;
export const signoutEndpoint = `${API_BASE_URL}/signout`;
// export const profileEndpoint = `${API_BASE_URL}/profile`;