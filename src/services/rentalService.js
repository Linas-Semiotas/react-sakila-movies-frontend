import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance('/api/rental');

const getAllRentals = async () => {
    try {
        const response = await axiosInstance.get('');
        return response.data;
    } catch (error) {
        console.error('Error fetching rentals:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const getRentalById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
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