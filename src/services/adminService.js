import apiRequest from '../utils/apiService';

const API_URL = '/api/admin';

// USERS
export const fetchUsers = async () => {
    return await apiRequest('get', '/users', null, API_URL);
};

export const updateUser = async (userId, updatedUserData) => {
    return await apiRequest('put', `/users/${userId}`, updatedUserData, API_URL);
};

// MOVIES
export const fetchMovies = async () => {
    return await apiRequest('get', '/movies', null, API_URL);
};

export const addMovie = async (movieData) => {
    return await apiRequest('post', '/movies', movieData, API_URL);
};

export const updateMovie = async (movieData) => {
    return await apiRequest('put', `/movies/${movieData.id}`, movieData, API_URL);
};

export const deleteMovie = async (id) => {
    return await apiRequest('delete', `/movies/${id}`, null, API_URL);
};

// LANGUAGES
export const fetchLanguages = async () => {
    return await apiRequest('get', '/languages', null, API_URL);
};

export const addLanguage = async (name) => {
    return await apiRequest('post', '/languages', { name }, API_URL);
};

export const deleteLanguage = async (id) => {
    return await apiRequest('delete', `/languages/${id}`, null, API_URL);
};

// CATEGORIES
export const fetchCategories = async () => {
    return await apiRequest('get', '/categories', null, API_URL);
};

export const addCategory = async (name) => {
    return await apiRequest('post', '/categories', { name }, API_URL);
};

export const deleteCategory = async (id) => {
    return await apiRequest('delete', `/categories/${id}`, null, API_URL);
};

// ACTORS
export const fetchActors = async () => {
    return await apiRequest('get', '/actors', null, API_URL);
};

export const addActor = async (firstName, lastName) => {
    return await apiRequest('post', '/actors', { firstName, lastName }, API_URL);
};

export const deleteActor = async (id) => {
    return await apiRequest('delete', `/actors/${id}`, null, API_URL);
};
