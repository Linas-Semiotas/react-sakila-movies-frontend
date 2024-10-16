import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/user');

// ORDERS
export const getOrders = async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
};

// BALANCE
// Fetch balance
export const getBalance = async () => {
    const response = await axiosInstance.get('/balance');
    return response.data;
};

// Add balance
export const addBalance = async (amount) => {
    const response = await axiosInstance.post('/balance/add', { amount });
    return response.data;
};

// PROFILE
// Fetch personal information
export const getPersonalInfo = async () => {
    const response = await axiosInstance.get('/profile/personal-info');
    return response.data;
};

// Update personal information
export const updatePersonalInfo = async (personalInfo) => {
    const response = await axiosInstance.put('/profile/personal-info', personalInfo);
    return response.data;
};

// Fetch address information
export const getAddressInfo = async () => {
    const response = await axiosInstance.get('/profile/address-info');
    return response.data;
};

// Update address information
export const updateAddressInfo = async (addressInfo) => {
    const response = await axiosInstance.put('/profile/address-info', addressInfo);
    return response.data;
};

// SECURITY
// Change password
export const changePassword = async (currentPassword, newPassword) => {
    const response = await axiosInstance.post('/security/change-password', {
        currentPassword,
        newPassword
    });
    return response.data;
};