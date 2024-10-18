import React, { useState, useEffect } from 'react';
import { fetchLanguages, addLanguage, deleteLanguage } from '../../services/adminService';
import Utils from '../../utils/Utility';

const AdminLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const [newLanguage, setNewLanguage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchLanguages()
            .then(setLanguages)
            .catch(err => Utils.handleResponse(err, setError, "Error fetching languages."));
    }, []);

    const handleAddLanguage = () => {
        Utils.resetResponse(setError, setSuccess);
    
        if (!newLanguage.trim()) {
            return Utils.handleResponse(null, setError, "Language name cannot be empty.");
        }
    
        addLanguage(newLanguage)
            .then(response => {
                Utils.handleResponse(response, setSuccess, "Language added successfully.");
                Utils.resetResponse(setNewLanguage);
                fetchLanguages().then(setLanguages);
            })
            .catch(err => Utils.handleResponse(err, setError, "Error adding language."));
    };

    const handleDeleteLanguage = (languageId) => {
        Utils.resetResponse(setError, setSuccess);
    
        deleteLanguage(languageId)
            .then(response => {
                Utils.handleResponse(response, setSuccess, 'Language deleted successfully.');
                Utils.resetResponse(setError);
                fetchLanguages().then(setLanguages);
            })
            .catch(err => Utils.handleResponse(err, setError, 'Error deleting language. It might be in use.'));
    };

    const { handleClickVar, ConfirmationModal } = Utils.useConfirmation(
        handleDeleteLanguage,
        "Confirmation",
        "Are you sure you want to delete this language?"
    );

    return (
        <div className="admin-container">
            <h2>Languages</h2>
            <div className="admin-container-row">
                <div className="admin-table-container admin-table-container-language">
                    <table className="admin-table">
                        <thead className="admin-table-header">
                            <tr>
                                <th style={{ width: '70%', textAlign: 'left' }}>Language</th>
                                <th style={{ width: '30%' }}>Action</th>
                                <td className='filler'></td>
                            </tr>
                        </thead>
                    </table>
                    <div className="admin-table-body">
                        <table className="admin-table">
                            <tbody>
                                {languages.map(lang => (
                                    <tr key={lang.id}>
                                        <td style={{ width: '70%', textAlign: 'left' }}>{lang.name}</td>
                                        <td style={{ width: '30%' }}>
                                            <button className="delete-button" onClick={() => handleClickVar(lang.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-details admin-details-language">
                    <h3>Add New Language</h3>
                    <div className="input-wrapper">
                        <input
                            name='language'
                            maxLength={50}
                            type="text"
                            placeholder="New Language"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            className="input-field"
                        />
                        <button className="add-button" onClick={handleAddLanguage}>Add</button>
                    </div>
                </div>
            </div>
            <ConfirmationModal/>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminLanguages;