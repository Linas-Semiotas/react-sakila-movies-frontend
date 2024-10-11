import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8080/api/rental';

const getAllRentals = async () => {
    const token = getToken();  // Fetch JWT token from local storage
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`  // Pass JWT token in Authorization header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching rentals:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const getRentalById = async (id) => {
    const token = getToken();  // Fetch JWT token from local storage
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`  // Pass JWT token in Authorization header
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching rental with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

const rentalService = {
    getAllRentals,
    getRentalById
};

export default rentalService;