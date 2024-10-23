import React from 'react';
import '../styles/ModalWindows.css';

//Create modal window that wants you to confirm your action
export const ConfirmationWindow = ({ show, name, message, onConfirm, onCancel }) => {
    if (!show) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) { // Ensure the click is on the overlay, not inside the modal
            onCancel(); // Call the onCancel function when background is clicked
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>{name}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};