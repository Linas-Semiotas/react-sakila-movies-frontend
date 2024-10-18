import axios from 'axios';
import { getToken } from '../services/authService';
import BASE_URL from './config';

const createAxiosInstance = (endpoint) => {
    // Create an instance of axios with a custom configuration
    const axiosInstance = axios.create({
        baseURL: BASE_URL + endpoint,
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