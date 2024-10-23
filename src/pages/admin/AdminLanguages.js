import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { languageSchema } from '../../utils/schemas';
import { TooltipFormikInput } from '../../components/Input';
import { Form } from '../../components/Form';
import { DeleteButton } from '../../components/Button';
import { fetchLanguages, addLanguage, deleteLanguage } from '../../services/adminService';
import Utils from '../../utils/utility';

const AdminLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchLanguages()
            .then(setLanguages)
            .catch(err => Utils.handleResponse(err, setError, "Error fetching languages."));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: languageSchema,
        onSubmit: (values, { resetForm }) => {
            Utils.resetResponse(setError, setSuccess);
            addLanguage(values.name)
                .then((response) => {
                    Utils.handleResponse(response, setSuccess, 'Language added successfully.');
                    fetchLanguages().then(setLanguages);
                    resetForm();
                })
                .catch(err => Utils.handleResponse(err, setError, 'Error adding language.'));
        }
    });

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
                                            <DeleteButton onClick={() => handleClickVar(lang.id)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-details admin-details-language">
                    <h3>Add New Language</h3>
                    <Form onSubmit={formik.handleSubmit} buttonText="Add Language">
                        <TooltipFormikInput
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="New Language"
                            error={formik.errors.name}
                            touched={formik.touched.name}
                        />
                    </Form>
                </div>
            </div>
            <ConfirmationModal/>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminLanguages;