import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { actorSchema } from '../../utils/schemas';
import { TooltipFormikInput, SimpleInput } from '../../components/Input';
import { Form } from '../../components/Form';
import { DeleteButton } from '../../components/Button';
import { fetchActors, addActor, deleteActor } from '../../services/adminService';
import Utils from '../../utils/utility';

const AdminActors = () => {
    const [actors, setActors] = useState([]);
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

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: ''
        },
        validationSchema: actorSchema,
        onSubmit: (values, { resetForm }) => {
            Utils.resetResponse(setError, setSuccess);
            addActor(values.firstName, values.lastName)
                .then((response) => {
                    Utils.handleResponse(response, setSuccess, 'Actor added successfully.');
                    fetchActors().then((data) => {
                        setActors(data);
                        setFilteredActors(data);
                    });
                    resetForm();
                })
                .catch(err => Utils.handleResponse(err, setError, 'Error adding actor.'));
        }
    });

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
                    <SimpleInput 
                        name="search"
                        maxLength={50}
                        placeholder="Search for actors..."
                        value={search}
                        onChange={handleSearchChange}
                    />
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
                                        <DeleteButton onClick={() => handleClickVar(actor.id)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-details admin-details-actor">
                    <h3>Add New Actor</h3>
                    <Form onSubmit={formik.handleSubmit} buttonText="Add Actor">
                        <TooltipFormikInput
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="First Name"
                            error={formik.errors.firstName}
                            touched={formik.touched.firstName}
                            label="First Name"
                            autoComplete="given-name"
                        />
                        <TooltipFormikInput
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Last Name"
                            error={formik.errors.lastName}
                            touched={formik.touched.lastName}
                            label="Last Name"
                            autoComplete="family-name"
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

export default AdminActors;