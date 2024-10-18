import createAxiosInstance from './axiosInstance';

const apiRequest = async (method, url, data = null, endpoint) => {
    const axiosInstance = createAxiosInstance(endpoint);

    try {
        const config = {
            method: method,
            url: url,
            data: data,
        };

        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

export default apiRequest;
