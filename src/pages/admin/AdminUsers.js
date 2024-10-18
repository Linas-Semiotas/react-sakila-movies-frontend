import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUser } from '../../services/adminService';
import Utils from '../../utils/Utility';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState({ user: 0, admin: 0, enabled: 0 });
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers()
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                setSelectedUser(data.length > 0 ? data[0] : { 
                    username: 'Username',
                    userRole: false,
                    adminRole: false,
                    enabled: false 
                });
            })
            .catch(err => Utils.handleResponse(err, setError, 'Error fetching users. Please try again.'));
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterUsers(e.target.value);
    };

    const filterUsers = (searchTerm) => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const toggleFilter = (type) => {
        const newFilter = { ...filter };
        newFilter[type] = (newFilter[type] + 1) % 3;
        setFilter(newFilter);
        applyFilters(newFilter);
    };

    const applyFilters = (newFilter) => {
        let filtered = users.filter(user => {
            const matchesUser = newFilter.user === 0 || (newFilter.user === 1 && user.userRole) || (newFilter.user === 2 && !user.userRole);
            const matchesAdmin = newFilter.admin === 0 || (newFilter.admin === 1 && user.adminRole) || (newFilter.admin === 2 && !user.adminRole);
            const matchesEnabled = newFilter.enabled === 0 || (newFilter.enabled === 1 && user.enabled) || (newFilter.enabled === 2 && !user.enabled);

            return matchesUser && matchesAdmin && matchesEnabled;
        });
        setFilteredUsers(filtered);
    };

    const getButtonColor = (type, value) => {
        if (filter[type] === 1) return '#d1f5c6';
        if (filter[type] === 2) return '#f5c6cb';
        return '#f0f0f0';
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        Utils.resetResponse(setError, setSuccess);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedUser(prev => ({ ...prev, [name]: checked }));
    };

    const saveChanges = async () => {
        if (!selectedUser) return;
        updateUser(selectedUser.userId, selectedUser)
            
        .then(() => {
            setSuccess('User updated successfully.');
            fetchUsers()
                .then(data => {
                    setUsers(data);
                    setFilteredUsers(data);
                })
        })
        .catch(err => Utils.handleResponse(err, setError, 'Error saving changes. Please try again.'));
    };

    const { handleClick, ConfirmationModal } = Utils.useConfirmation(
        saveChanges,
        "Confirmation",
        "Are you sure you want to update user?"
    );

    return (
        <div className="admin-container">
            <h2>Permissions</h2>
            <div className='admin-container-row'>
                <div className="admin-table-container">
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
                                <th style={{ width: '50%', textAlign: 'left' }}>Username</th>
                                <th onClick={() => toggleFilter('user')} style={{ backgroundColor: getButtonColor('user', filter.user), width: '17%', cursor: 'pointer' }}>User</th>
                                <th onClick={() => toggleFilter('admin')} style={{ backgroundColor: getButtonColor('admin', filter.admin), width: '17%', cursor: 'pointer' }}>Admin</th>
                                <th onClick={() => toggleFilter('enabled')} style={{ backgroundColor: getButtonColor('enabled', filter.enabled), width: '17%', cursor: 'pointer' }}>Enabled</th>
                                <td className='filler'></td>
                            </tr>
                        </thead>
                    </table>
                    <div className="admin-table-body">
                        <table className="admin-table">
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.userId} onClick={() => handleUserSelect(user)}>
                                        <td style={{ width: '50%', textAlign: 'left' }}>{user.username}</td>
                                        <td style={{ width: '17%' }}>{user.userRole ? '✓' : 'X'}</td>
                                        <td style={{ width: '17%' }}>{user.adminRole ? '✓' : 'X'}</td>
                                        <td style={{ width: '17%' }}>{user.enabled ? '✓' : 'X'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {selectedUser && (
                    <div className="admin-details">
                        <h3>{selectedUser.username}</h3>
                        <div className="checkbox-row">
                            <label htmlFor='userRole'>User</label>
                            <input
                                id="userRole"
                                type="checkbox"
                                name="userRole"
                                checked={selectedUser.userRole}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className="checkbox-row">
                            <label htmlFor='adminRole'>Admin</label>
                            <input
                                id="adminRole"
                                type="checkbox"
                                name="adminRole"
                                checked={selectedUser.adminRole}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className="checkbox-row">
                            <label htmlFor='enabled'>Enabled</label>
                            <input
                                id='enabled'
                                type="checkbox"
                                name="enabled"
                                checked={selectedUser.enabled}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <button className="submit-button" onClick={handleClick}>Save Changes</button>
                    </div>                
                )}
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <ConfirmationModal/>
        </div>
    );
};

export default AdminUsers;
