import apiRequest from '../utils/apiService';

const API_URL = "/api/rental";

export const getAllRentals = async () => {
    return await apiRequest('get', '', null, API_URL);
};

export const getRentalById = async (id) => {
    return await apiRequest('get', `/${id}`, {id}, API_URL);
};

export const rentMovie = async (id) => {
    return await apiRequest('post', `/rent`, {id}, API_URL);
};