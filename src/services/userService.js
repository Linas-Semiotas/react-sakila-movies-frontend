import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/user');

// BALANCE
// Fetch balance
export const getBalance = async () => {
    try {
        const response = await axiosInstance.get('/balance');
        return response.data;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
};

// Add balance
export const addBalance = async (amount) => {
    try {
        const response = await axiosInstance.post('/balance/add', { amount });
        return response.data;
    } catch (error) {
        console.error("Error adding balance:", error);
        throw error;
    }
};

// PROFILE
// Fetch personal information
export const getPersonalInfo = async () => {
    try {
        const response = await axiosInstance.get('/profile/personal-info');
        return response.data;
    } catch (error) {
        console.error("Error fetching personal information:", error);
        throw error;
    }
};

// Update personal information
export const updatePersonalInfo = async (personalInfo) => {
    try {
        const response = await axiosInstance.put('/profile/personal-info', personalInfo);
        return response.data;
    } catch (error) {
        console.error("Error updating personal information:", error);
        throw error;
    }
};

// Fetch address information
export const getAddressInfo = async () => {
    try {
        const response = await axiosInstance.get('/profile/address-info');
        return response.data;
    } catch (error) {
        console.error("Error fetching address information:", error);
        throw error;
    }
};

// Update address information
export const updateAddressInfo = async (addressInfo) => {
    try {
        const response = await axiosInstance.put('/profile/address-info', addressInfo);
        return response.data;
    } catch (error) {
        console.error("Error updating address information:", error);
        throw error;
    }
};

// SECURITY
// Change password
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await axiosInstance.post('/security/change-password', {
            currentPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};