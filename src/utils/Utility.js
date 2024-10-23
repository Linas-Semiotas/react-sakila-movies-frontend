import { useState } from 'react';
import * as Yup from 'yup';
import { ConfirmationWindow } from '../components/ModalWindows';

const Utils = {

    //---------------RESPONSE HANDLING-----------------------

    //Handle error or success messages example: Utils.handleResponse(err, setError, "Error doing something")
    handleResponse: (msg, setMessage, text) => {
        if (msg?.response?.data?.errors) {
            const fieldErrors = Object.values(msg.response.data.errors).join(' ');
            setMessage(fieldErrors);
        } else {
            setMessage(msg?.response?.data?.message || text);
        }
    },

    //Resets arguments that listed to '' example:  Utils.resetResponse(setError, setSuccess, setUser)
    resetResponse: (...setters) => {
        setters.forEach(setter => setter(''));
    },

    //---------------MODAL WINDOWS---------------------------
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
    },

    //---------------YUP SCHEMAS-----------------------------

    schemaPositive: (fieldName, isRequired = true) => {
        let schema = Yup.number()
          .positive(`${fieldName} must be a positive number`);
    
        if (isRequired) {
          schema = schema.required(`${fieldName} is required`);
        }
        return schema;
    },
    
    schemaMinMax: (fieldName, min, max, isRequired = true) => {
        let schema = Yup.string()
          .min(min, `${fieldName} must be between ${min} and ${max} characters`)
          .max(max, `${fieldName} must be between ${min} and ${max} characters`);
        if (isRequired) {
            schema = schema.required(`${fieldName} is required`);
        }
        return schema;
    },
    
    schemaPattern: (fieldName, regex, isRequired = true) => {
        let schema = Yup.string().matches(regex, `${fieldName} is invalid`);
        if (isRequired) {
            schema = schema.required(`${fieldName} is required`);
        }
        return schema;
    },

    schemaDecimalMin: (fieldName, minValue = "0.01", isRequired = true) => {
        let schema = Yup.number()
            .min(minValue, `${fieldName} must be at least ${minValue}`);
    
        if (isRequired) {
            schema = schema.required(`${fieldName} is required`);
        }
        return schema;
    },

    schemaValueMinMax: (fieldName, min, max, isRequired = true) => {
        let schema = Yup.number()
            .min(min, `${fieldName} must be at least ${min}`)
            .max(max, `${fieldName} must be at most ${max}`);
        
        if (isRequired) {
            schema = schema.required(`${fieldName} is required`);
        }
        return schema;
    },

    schemaEmail: (isRequired = true) => {
        let schema = Yup.string()
            .email('Email should be valid');
        
        if (isRequired) {
            schema = schema.required('Email is required');
        }
        return schema;
    }
};

export default Utils;