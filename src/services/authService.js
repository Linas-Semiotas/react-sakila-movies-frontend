import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BASE_URL from '../utils/config';

const API_URL = BASE_URL + '/api/auth';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            logout();
            return null;
        }

        return token;
    } catch (error) {
        console.error('Error decoding token:', error);
        logout();
        return null;
    }
};

export const getUsername = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.sub || '';
    } catch (error) {
        console.error('Error decoding token:', error);
        return '';
    }
};

export const getUserRoles = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.roles || [];
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    }, {
        withCredentials: true
    });
    return response.data;
};

export const register = async (username, password, firstName, lastName, email, storeId) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        firstName,
        lastName,
        email,
        storeId
    });
    return response.data;
};

export const logout = async () => {
    localStorage.removeItem('token');
};