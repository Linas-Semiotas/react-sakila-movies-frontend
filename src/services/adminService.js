import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/admin');

// USERS
export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


export const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await axiosInstance.put(`/users/${userId}`, updatedUserData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

//MOVIES

export const fetchMovies = async () => {
    const response = await axiosInstance.get('/movies');
    console.log(response.data);
    return response.data;
};

export const addMovie = async (movieData) => {
    const response = await axiosInstance.post('/movies', movieData);
    return response.data;
};

export const deleteMovie = async (id) => {
    const response = await axiosInstance.delete(`/movies/${id}`);
    return response.data;
};

//LANGUAGES
export const fetchLanguages = async () => {
    const response = await axiosInstance.get('/languages');
    return response.data;
};

export const addLanguage = async (name) => {
    const response = await axiosInstance.post('/languages', { name });
    return response.data;
};

export const deleteLanguage = async (id) => {
    const response = await axiosInstance.delete(`/languages/${id}`);
    return response.data;
};

//CATEGORIES
export const fetchCategories = async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
};

export const addCategory = async (name) => {
    const response = await axiosInstance.post('/categories', { name });
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
};

// ACTORS
export const fetchActors = async () => {
    const response = await axiosInstance.get('/actors');
    return response.data;
};

export const addActor = async (firstName, lastName) => {
    const response = await axiosInstance.post('/actors', { firstName, lastName });
    return response.data;
};

export const deleteActor = async (id) => {
    const response = await axiosInstance.delete(`/actors/${id}`);
    return response.data;
};