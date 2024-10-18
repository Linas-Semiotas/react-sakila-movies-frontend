import apiRequest from '../utils/apiService';

const API_URL = "/api/movies";

export const getAllMovies = async () => {
    return await apiRequest('get', '', null, API_URL);
};

export const getMovieById = async (id) => {
    return await apiRequest('get', `/${id}`, {id}, API_URL);
};