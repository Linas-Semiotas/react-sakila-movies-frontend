import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/stores');

export const getAllStores = async () => {
    const response = await axiosInstance.get('');
    return response.data;
};