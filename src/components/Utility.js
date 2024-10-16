const Utils = {
    //Handle error or success messages example: Utils.handleResponse(err, setError, "Error doing something")
    handleResponse: (msg, setMessage, text) => {
        setMessage(msg?.response?.data?.message || text);
    },

    resetResponse: (...setters) => {
        setters.forEach(setter => setter(''));
    }

};

export default Utils;