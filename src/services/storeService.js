import apiRequest from '../utils/apiService';

const API_URL = "/api/stores";

export const getAllStores = async () => {
    return await apiRequest('get', '', null, API_URL);
};