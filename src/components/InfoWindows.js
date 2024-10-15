import React from 'react';
import '../styles/InfoWindows.css';

export const ConfirmationWindow = ({ show, name, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
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