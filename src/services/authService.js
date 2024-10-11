import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const getToken = () => {
    return localStorage.getItem('token');
};

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Clear the token
        }
        return Promise.reject(error);
    }
);

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