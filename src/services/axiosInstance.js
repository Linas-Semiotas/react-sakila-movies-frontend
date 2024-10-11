import axios from 'axios';
import { getToken } from './authService';

// Function to create an Axios instance with a custom base URL
const createAxiosInstance = (endpoint) => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080' + endpoint,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Add a request interceptor to include the token in every request
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosInstance;
};

export default createAxiosInstance;