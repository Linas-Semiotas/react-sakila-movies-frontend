import apiRequest from '../utils/apiService';

const API_URL = '/api/auth';

export const getUserInfo = async () => {
    try {
        return await apiRequest('get', '/me', null, API_URL, true);
    } catch (error) {
        return error.response?.status === 401 ? null : console.error("Error fetching user info:", error) || null;
    }
};

export const login = async (username, password) => {
    return await apiRequest('post', '/login', { username, password }, API_URL, true);
};

export const register = async (username, password, firstName, lastName, email, storeId) => {
    return await apiRequest('post', '/register', {
        username,
        password,
        firstName,
        lastName,
        email,
        storeId
    }, API_URL);
};

export const logout = async () => {
    return await apiRequest('post', '/logout', {}, API_URL, true);
};

export const refreshToken = async () => {
    return await apiRequest('post', '/refresh-token', {}, API_URL, true);
};
