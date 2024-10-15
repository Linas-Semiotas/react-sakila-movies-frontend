import React, { useState, useEffect } from 'react';
import { fetchActors, addActor, deleteActor } from '../../services/adminService';
import { ConfirmationWindow } from '../../components/InfoWindows';

const AdminActors = () => {
    const [actors, setActors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [search, setSearch] = useState('');
    const [filteredActors, setFilteredActors] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        fetchActors()
            .then((data) => {
                setActors(data);
                setFilteredActors(data);
            })
            .catch(() => setError("Error fetching actors."));
    }, []);

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filtered = actors.filter(actor =>
            actor.firstName.toLowerCase().includes(searchTerm) ||
            actor.lastName.toLowerCase().includes(searchTerm)
        );

        setFilteredActors(filtered);
    };

    const handleAddActor = () => {
        setError(null);
        setSuccess(null);

        if (!firstName.trim() || !lastName.trim()) {
            setError("Both first and last name are required.");
            return;
        }

        addActor(firstName, lastName)
            .then(() => {
                setSuccess("Actor added successfully.");
                setFirstName('');
                setLastName('');
                fetchActors().then(setActors);
            })
            .catch(err => setError(err.response?.data?.error || "Error adding actor."));
    };

    const handleDeleteActor = async (actorId) => {
        setError(null);
        setSuccess(null);
        try {
            await deleteActor(actorId);
            setSuccess('Actor deleted successfully.');
            setError(null);
            fetchActors().then(setActors);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error deleting actor. It might be in use.';
            setError(errorMessage);
        }
    };

    const handleDeleteClick = (id) => {
        setItemToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteActor(itemToDelete);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div className="admin-container">
            <h2>Actors</h2>
            <div className="admin-container-row">
                <div className="admin-table-container admin-table-container-actor">
                    <div className="input-wrapper search">
                        <input
                            name='search'
                            maxLength={50}
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <table className="admin-table">
                        <thead className="admin-table-header">
                            <tr>
                                <th style={{ width: '35%', textAlign: 'left' }}>First name</th>
                                <th style={{ width: '35%', textAlign: 'left' }}>Last name</th>
                                <th style={{ width: '30%' }}>Action</th>
                                <td className='filler'></td>
                            </tr>
                        </thead>
                    </table>
                    <div className="admin-table-body">
                        <table className="admin-table">
                            <tbody>
                                {filteredActors.map(actor => (
                                    <tr key={actor.id}>
                                        <td style={{ width: '35%', textAlign: 'left' }}>{actor.firstName}</td>
                                        <td style={{ width: '35%', textAlign: 'left' }}>{actor.lastName}</td>
                                        <td style={{ width: '30%' }}>
                                            <button className="delete-button" onClick={() => handleDeleteClick(actor.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-details admin-details-actor">
                    <h3>Add New Actor</h3>
                    <div className="input-wrapper">
                        <input
                            name='firstName'
                            maxLength={50}
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input-field"
                        />
                        <input
                            name='lastName'
                            maxLength={50}
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input-field"
                        />
                        <button className="add-button" onClick={handleAddActor}>Add</button>
                    </div>
                </div>
            </div>
            <ConfirmationWindow
                show={showModal}
                name="Confirmation"
                message="Are you sure you want to delete this Actor?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminActors;
