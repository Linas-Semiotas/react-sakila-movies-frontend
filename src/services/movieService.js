import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

const getAllMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

const movieService = {
    getAllMovies,
    getMovieById
};

export default movieService;