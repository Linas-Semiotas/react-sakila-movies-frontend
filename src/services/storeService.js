import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stores';

const getAllStores = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching stores:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const storeService = {
    getAllStores
};

export default storeService;