import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, deleteCategory } from '../../services/adminService';
import Utils from '../../utils/Utility';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(err => Utils.handleResponse(err, setError, "Error fetching categories."));
    }, []);

    const handleAddCategory = () => {
        Utils.resetResponse(setError, setSuccess);
        
        if (!newCategory.trim()) {
            return Utils.handleResponse(null, setError, "Category name cannot be empty.");
        }
        
        addCategory(newCategory)
            .then((response) => {
                Utils.handleResponse(response, setSuccess, "Category added successfully.");
                Utils.resetResponse(setNewCategory);
                fetchCategories().then(setCategories);
            })
            .catch(err => Utils.handleResponse(err, setError, "Error adding category."));
    };

    const handleDeleteCategory = (categoryId) => {
        Utils.resetResponse(setError, setSuccess);

        deleteCategory(categoryId)
            .then((response) => {
                Utils.handleResponse(response, setSuccess, "Category deleted successfully.");
                Utils.resetResponse(setError);
                fetchCategories().then(setCategories);
            })
            .catch(err => Utils.handleResponse(err, setError, "Error deleting category. It might be in use."));
    };

    const { handleClickVar, ConfirmationModal } = Utils.useConfirmation(
        handleDeleteCategory,
        "Confirmation",
        "Are you sure you want to delete this category?"
    );

    return (
        <div className="admin-container">
            <h2>Categories</h2>
            <div className="admin-container-row">
                <div className="admin-table-container admin-table-container-category">
                    <table className="admin-table">
                        <thead className="admin-table-header">
                            <tr>
                                <th style={{ width: '70%', textAlign: 'left' }}>Category</th>
                                <th style={{ width: '30%' }}>Action</th>
                                <td className='filler'></td>
                            </tr>
                        </thead>
                    </table>
                    <div className="admin-table-body">
                        <table className="admin-table">
                            <tbody>
                                {categories.map(categ => (
                                    <tr key={categ.id}>
                                        <td style={{ width: '70%', textAlign: 'left' }}>{categ.name}</td>
                                        <td style={{ width: '30%' }}>
                                            <button className="delete-button" onClick={() => handleClickVar(categ.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-details admin-details-category">
                    <h3>Add New Category</h3>
                    <div className="input-wrapper">
                        <input
                            name='category'
                            maxLength={50}
                            type="text"
                            placeholder="New Category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="input-field"
                        />
                        <button className="add-button" onClick={handleAddCategory}>Add</button>
                    </div>
                </div>
            </div>
            <ConfirmationModal />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminCategories;
