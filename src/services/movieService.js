import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/movies');

export const getAllMovies = async () => {
    const response = await axiosInstance.get('');
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
};