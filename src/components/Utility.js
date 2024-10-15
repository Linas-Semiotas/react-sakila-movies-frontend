const Utils = {

    handleResponse: (msg, setMessage, text) => {
        setMessage(msg?.response?.data?.message || text);
    },

};

export default Utils;