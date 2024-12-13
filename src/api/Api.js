import axios from 'axios';
import Cookies from 'js-cookie';

// Corrected baseURL
const api = axios.create({
    baseURL: 'http://localhost:9090/api', // Fix: baseURL instead of baseUrl
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Get token from cookies
    }
});

// Interceptor for handling responses and errors globally
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

// API object with all methods
const Api = {
    // GET request
    get: async (url, params = {}) => {
        try {
            const response = await api.get(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // POST request
    post: async (url, data) => {
        try {
            const response = await api.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // PUT request
    put: async (url, data) => {
        try {
            const response = await api.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // DELETE request
    delete: async (url) => {
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default Api;
