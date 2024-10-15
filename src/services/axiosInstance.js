import axios from 'axios';
import { getToken } from './authService';

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

    // Add a response interceptor to handle global errors
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const { response } = error;
            if (response) {
                if (response.status === 401) {
                    console.error(`Error ${response.status}: ${response.data.message || 'Unauthorized access. Please log in.'}`);
                } else if (response.status === 403) {
                    console.error(`Error ${response.status}: ${response.data.message || 'Forbidden: Access is denied.'}`);
                } else if (response.status === 500) {
                    console.error(`Error ${response.status}: ${response.data.message || 'Internal server error. Please try again later.'}`);
                } else {
                    console.error(`Error ${response.status}: ${response.data.message || 'An unknown error occurred.'}`);
                }
            } else {
                console.error('Network error: Please check your connection or try again later.');
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default createAxiosInstance;