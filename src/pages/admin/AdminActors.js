import React, { useState, useEffect } from 'react';
import { fetchActors, addActor, deleteActor } from '../../services/adminService';
import Utils from '../../utils/Utility';

const AdminActors = () => {
    const [actors, setActors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [search, setSearch] = useState('');
    const [filteredActors, setFilteredActors] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 

    useEffect(() => {
        fetchActors()
            .then((data) => {
                setActors(data);
                setFilteredActors(data);
            })
            .catch((err) => Utils.handleResponse(err, setError, 'Error fetching actors.'));
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
        Utils.resetResponse(setError, setSuccess);

        if (!firstName.trim() || !lastName.trim()) {
            Utils.handleResponse(null, setError, 'Both first and last name are required.');
            return;
        }

        addActor(firstName, lastName)
            .then((response) => {
                Utils.handleResponse(response, setSuccess, 'Actor added successfully.');
                Utils.resetResponse(setFirstName, setLastName);
                fetchActors().then((data) => {
                    setActors(data);
                    setFilteredActors(data);
                });
            })
            .catch(err => Utils.handleResponse(err, setError, 'Error adding actor.'));
    };

    const handleDeleteActor = async (actorId) => {
        Utils.resetResponse(setError, setSuccess);

        deleteActor(actorId)
            .then((response) => {
                Utils.handleResponse(response, setSuccess, 'Actor deleted successfully.');
                fetchActors().then((data) => {
                    setActors(data);
                    setFilteredActors(data);
                });
            })
            .catch(err => Utils.handleResponse(err, setError, 'Error deleting actor. It might be in use.'));
    };

    const { handleClickVar, ConfirmationModal } = Utils.useConfirmation(
        handleDeleteActor,
        "Confirmation",
        "Are you sure you want to delete this actor?"
    );

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
                                            <button className="delete-button" onClick={() => handleClickVar(actor.id)}>Delete</button>
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
            <ConfirmationModal />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminActors;