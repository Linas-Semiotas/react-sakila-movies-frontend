import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { categorySchema } from '../../utils/schemas';
import { TooltipFormikInput } from '../../components/Input';
import { Form } from '../../components/Form';
import { DeleteButton } from '../../components/Button';
import { fetchCategories, addCategory, deleteCategory } from '../../services/adminService';
import Utils from '../../utils/utility';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(err => Utils.handleResponse(err, setError, "Error fetching categories."));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            Utils.resetResponse(setError, setSuccess);

            addCategory(values.name)
                .then((response) => {
                    Utils.handleResponse(response, setSuccess, 'Category added successfully.');
                    fetchCategories().then(setCategories);
                    resetForm();
                })
                .catch(err => Utils.handleResponse(err, setError, 'Error adding category.'));
        }
    });

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
                                        <DeleteButton onClick={() => handleClickVar(categ.id)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-details admin-details-category">
                    <h3>Add New Category</h3>
                    <Form onSubmit={formik.handleSubmit} buttonText="Add Category">
                        <TooltipFormikInput
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="New Category"
                            error={formik.errors.name}
                            touched={formik.touched.name}
                        />
                    </Form>
                </div>
            </div>
            <ConfirmationModal />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminCategories;
