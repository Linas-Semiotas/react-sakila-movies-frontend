import axios from 'axios';
import { BASE_URL } from './config';
import { logout } from '../services/authService';

const createAxiosInstance = (endpoint) => {
    // Create an instance of axios with a custom configuration
    const axiosInstance = axios.create({
        baseURL: `${BASE_URL}${endpoint}`, // Base URL for the API endpoint
        withCredentials: true // Ensure cookies are sent with each request
    });

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            const { response } = error;

            if (response && response.status === 401) {
                // Token expired or user not authenticated
                logout();  // Perform logout action
                window.location.href = '/login';  // Redirect to login page
            }

            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle global errors
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const { response } = error;

            if (response) {
                error.customError = {
                    code: response.status,
                    message: response.data.message || 'An error occurred.'
                };
            } else {
                error.customError = {
                    code: 'Network Error',
                    message: 'Please check your connection or try again later.'
                };
            }

            return Promise.reject(error);
        }
    );
    
    return axiosInstance;
};

export default createAxiosInstance;