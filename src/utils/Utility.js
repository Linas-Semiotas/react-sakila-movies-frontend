import { useState } from 'react';
import { ConfirmationWindow } from '../components/InfoWindows';

const Utils = {
    //Handle error or success messages example: Utils.handleResponse(err, setError, "Error doing something")
    handleResponse: (msg, setMessage, text) => {
        setMessage(msg?.response?.data?.message || text);
    },

    //Resets arguments that listed to '' example:  Utils.resetResponse(setError, setSuccess, setUser)
    resetResponse: (...setters) => {
        setters.forEach(setter => setter(''));
    },

    //Confirmation window functionality
    useConfirmation: (onConfirm, title, message) => {
        const [showModal, setShowModal] = useState(false);
        const [itemId, setItemId] = useState(null);

        const handleClick = () => {
            setShowModal(true); // Opens modal for general confirmation
        };

        const handleClickVar = (id) => {
            setItemId(id); // Sets the ID for variable confirmation
            setShowModal(true); // Opens modal
        };

        const handleConfirm = () => {
            if (itemId !== null) {
                onConfirm(itemId); // Pass the item ID to the confirmation action
            } else {
                onConfirm(); // Call onConfirm without ID for general confirmation
            }
            setShowModal(false);
            setItemId(null); // Reset itemId after confirmation
        };

        const handleCancel = () => {
            setShowModal(false); // Closes modal
            setItemId(null); // Reset itemId on cancel
        };

        const ConfirmationModal = () => (
            <ConfirmationWindow
                show={showModal}
                name={title}
                message={message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        );

        return { handleClick, handleClickVar, ConfirmationModal };
    }

};

export default Utils;