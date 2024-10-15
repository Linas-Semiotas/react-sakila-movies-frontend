import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080/api/auth';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Clear the token
        }
        return Promise.reject(error);
    }
);

export const getToken = () => {
    return localStorage.getItem('token');
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
    return response;
};

export const logout = async () => {
    localStorage.removeItem('token');
};