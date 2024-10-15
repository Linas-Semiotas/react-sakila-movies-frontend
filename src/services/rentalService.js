import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/rental');

export const getAllRentals = async () => {
    const response = await axiosInstance.get('');
    return response.data;
};

export const getRentalById = async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
};

export const rentMovie = async (id) => {
    const response = await axiosInstance.post(`/rent`, { id });
    return response;
};