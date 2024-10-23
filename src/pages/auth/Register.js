import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../utils/schemas';
import { TooltipFormikInput, TooltipFormikPasswordInput, TooltipFormikSelect } from '../../components/Input';
import { Form } from '../../components/Form';
import { MainContainerSmall } from '../../components/Containers';
import { getAllStores} from '../../services/storeService';
import { register } from '../../services/authService';
import Utils from '../../utils/utility';

const Register = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllStores()
            .then(data => setStores(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while getting stores'));
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            storeId: '',
            username: '',
            password: ''
        },
        validationSchema: registerSchema,
        onSubmit: async (values, { setErrors }) => {
            register(values.username, values.password, values.firstName, values.lastName, values.email, values.storeId)
                .then(() => navigate('/register-success'))
                .catch(err => Utils.handleResponse(err, setError, 'An error occurred during registration'));
        }
    });

    return (
        <MainContainerSmall title="Register">
            <Form onSubmit={formik.handleSubmit} buttonText="Register">
                <div className="input-group-wrapper">
                    <TooltipFormikInput
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="First name"
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                        label="First name"
                        autoComplete="given-name"
                    />
                    <TooltipFormikInput
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Last name"
                        error={formik.errors.lastName}
                        touched={formik.touched.lastName}
                        label="Last name"
                        autoComplete="family-name"
                    />
                </div>
                <TooltipFormikInput
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Email"
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    label="Email"
                />
                <TooltipFormikSelect
                    name="storeId"
                    value={formik.values.storeId}
                    onChange={(e) => formik.setFieldValue('storeId', e.target.value ? Number(e.target.value) : '')} // Only cast to number if value exists
                    onBlur={formik.handleBlur}
                    error={formik.errors.storeId}
                    touched={formik.touched.storeId}
                    label="Store location"
                    options={stores}
                    optionKey="storeId"
                    optionLabel="country"
                    margin="0 0 21px 0"
                    useKeyAsValue={true}
                />
                <TooltipFormikInput
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Username"
                    error={formik.errors.username}
                    touched={formik.touched.username}
                    label="Username"
                />
                <TooltipFormikPasswordInput
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    label="Password"
                />
            </Form>
            {error && <p className="error-message">{error}</p>}
        </MainContainerSmall>
    );
};

export default Register;
