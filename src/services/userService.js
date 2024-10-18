import apiRequest from '../utils/apiService';

const API_URL = '/api/user';

// ORDERS
export const getOrders = async () => {
    return await apiRequest('get', '/orders', null, API_URL);
};

// BALANCE
export const getBalance = async () => {
    return await apiRequest('get', '/balance', null, API_URL);
};

export const addBalance = async (amount) => {
    return await apiRequest('post', '/balance/add', { amount }, API_URL);
};

// PROFILE > PERSONAL
export const getPersonalInfo = async () => {
    return await apiRequest('get', '/profile/personal-info', null, API_URL);
};

export const updatePersonalInfo = async (personalInfo) => {
    return await apiRequest('put', '/profile/personal-info', personalInfo, API_URL);
};

// PROFILE > ADDRESS
export const getAddressInfo = async () => {
    return await apiRequest('get', '/profile/address-info', null, API_URL);
};

export const updateAddressInfo = async (addressInfo) => {
    return await apiRequest('put', '/profile/address-info', addressInfo, API_URL);
};

// SECURITY
export const changePassword = async (currentPassword, newPassword) => {
    return await apiRequest('post', '/security/change-password', {currentPassword, newPassword}, API_URL);
};
