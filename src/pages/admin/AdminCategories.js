import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, deleteCategory } from '../../services/adminService';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(() => setError("Error fetching categories."));
    }, []);

    const handleAddCategory = () => {
        setError(null);
        setSuccess(null);
        
        if (!newCategory.trim()) {
            setError("Category name cannot be empty.");
            return;
        }
        
        addCategory(newCategory)
            .then(() => {
                setSuccess("Category added successfully.");
                setNewCategory('');
                fetchCategories().then(setCategories);
            })
            .catch(err => setError(err.response?.data?.error || "Error adding category."));
    };

    const handleDeleteCategory = async (categoryId) => {
        setError(null);
        setSuccess(null);
        try {
            await deleteCategory(categoryId);
            setSuccess('Category deleted successfully.');
            setError(null);
            fetchCategories().then(setCategories);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error deleting category. It might be in use.';
            setError(errorMessage);
        }
    };

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
                                            <button className="delete-button" onClick={() => handleDeleteCategory(categ.id)}>Delete</button>
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
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminCategories;
