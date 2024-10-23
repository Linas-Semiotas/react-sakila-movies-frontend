import createAxiosInstance from './axiosInstance';

const apiRequest = async (method, url, data = null, endpoint, sendCredentials = false) => {
    const axiosInstance = createAxiosInstance(endpoint);

    try {
        const config = {
            method: method,
            url: url,
            data: data,
        };

        if (sendCredentials) {
            config.withCredentials = true;
        }

        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default apiRequest;
