import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { personalInfoSchema, addressInfoSchema } from '../../utils/schemas';
import { TooltipFormikInput } from '../../components/Input';
import { Form } from '../../components/Form';
import { getPersonalInfo, updatePersonalInfo, getAddressInfo, updateAddressInfo } from '../../services/userService';
import Utils from '../../utils/utility';

const UserProfile = () => {
    const [personalError, setPersonalError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [personalSuccess, setPersonalSuccess] = useState('');
    const [addressSuccess, setAddressSuccess] = useState('');

    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [addressInfo, setAddressInfo] = useState({
        address: '',
        district: '',
        postalCode: '',
        city: '',
        country: ''
    });

    useEffect(() => {
        getPersonalInfo()
            .then(response => setPersonalInfo(response))
            .catch(err => Utils.handleResponse(err, setPersonalError, 'There was an error loading your personal information.'));

        getAddressInfo()
            .then(response => setAddressInfo(response))
            .catch(err => Utils.handleResponse(err, setAddressError, 'There was an error loading your address information.'));
    }, []);

    const personalFormik = useFormik({
        initialValues: personalInfo,
        enableReinitialize: true,  // Reinitialize form when initialValues change
        validationSchema: personalInfoSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            updatePersonalInfo(values)
                .then(response => {
                    Utils.handleResponse(response, setPersonalSuccess, 'Personal information updated successfully');
                    setPersonalError('');
                })
                .catch(err => {
                    Utils.handleResponse(err, setPersonalError, 'There was an error updating your personal information.');
                    setPersonalSuccess('');
                })
                .finally(() => setSubmitting(false));
        },
    });

    const addressFormik = useFormik({
        initialValues: addressInfo,
        enableReinitialize: true,  // Reinitialize form when initialValues change
        validationSchema: addressInfoSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            updateAddressInfo(values)
                .then(response => {
                    Utils.handleResponse(response, setAddressSuccess, 'Address information updated successfully');
                    setAddressError('');
                })
                .catch(err => {
                    Utils.handleResponse(err, setAddressError, 'There was an error updating your address information.');
                    setAddressSuccess('');
                })
                .finally(() => setSubmitting(false));
        },
    });

    return (
        <div>
            {/* Personal Info Form */}
            <div className="user-container">
                <h2>Personal Info</h2>
                <Form onSubmit={personalFormik.handleSubmit} buttonText="Save Changes">
                    <TooltipFormikInput
                        name="firstName"
                        label="First Name"
                        value={personalFormik.values.firstName}
                        onChange={personalFormik.handleChange}
                        onBlur={personalFormik.handleBlur}
                        placeholder="First name"
                        maxLength={50}
                        error={personalFormik.errors.firstName}
                        touched={personalFormik.touched.firstName}
                        autoComplete="given-name"
                    />
                    <TooltipFormikInput
                        name="lastName"
                        label="Last Name"
                        value={personalFormik.values.lastName}
                        onChange={personalFormik.handleChange}
                        onBlur={personalFormik.handleBlur}
                        placeholder="Last name"
                        maxLength={50}
                        error={personalFormik.errors.lastName}
                        touched={personalFormik.touched.lastName}
                        autoComplete="family-name"
                    />
                    <TooltipFormikInput
                        name="email"
                        label="Email"
                        type="email"
                        value={personalFormik.values.email}
                        onChange={personalFormik.handleChange}
                        onBlur={personalFormik.handleBlur}
                        placeholder="Email"
                        maxLength={255}
                        error={personalFormik.errors.email}
                        touched={personalFormik.touched.email}
                    />
                    <TooltipFormikInput
                        name="phone"
                        label="Phone"
                        type="tel"
                        value={personalFormik.values.phone}
                        onChange={personalFormik.handleChange}
                        onBlur={personalFormik.handleBlur}
                        placeholder="Phone number"
                        maxLength={255}
                        error={personalFormik.errors.phone}
                        touched={personalFormik.touched.phone}
                    />
                </Form>
                {personalError && <p className="error-message">{personalError}</p>}
                {personalSuccess && <p className="success-message">{personalSuccess}</p>}
            </div>
            
            <div className="user-container">
                <h2>Address Info</h2>
                <Form onSubmit={addressFormik.handleSubmit} buttonText="Save Changes">
                    <TooltipFormikInput
                        name="address"
                        label="Address"
                        value={addressFormik.values.address}
                        onChange={addressFormik.handleChange}
                        onBlur={addressFormik.handleBlur}
                        placeholder="Address"
                        maxLength={255}
                        error={addressFormik.errors.address}
                        touched={addressFormik.touched.address}
                    />
                    <TooltipFormikInput
                        name="district"
                        label="District"
                        value={addressFormik.values.district}
                        onChange={addressFormik.handleChange}
                        onBlur={addressFormik.handleBlur}
                        placeholder="District"
                        maxLength={255}
                        error={addressFormik.errors.district}
                        touched={addressFormik.touched.district}
                    />
                    <TooltipFormikInput
                        name="postalCode"
                        label="Postal Code"
                        value={addressFormik.values.postalCode}
                        onChange={addressFormik.handleChange}
                        onBlur={addressFormik.handleBlur}
                        placeholder="Postal Code"
                        maxLength={10}
                        error={addressFormik.errors.postalCode}
                        touched={addressFormik.touched.postalCode}
                        autoComplete="postal-code"
                    />
                    <TooltipFormikInput
                        name="city"
                        label="City"
                        value={addressFormik.values.city}
                        onChange={addressFormik.handleChange}
                        onBlur={addressFormik.handleBlur}
                        placeholder="City"
                        maxLength={255}
                        error={addressFormik.errors.city}
                        touched={addressFormik.touched.city}
                        autoComplete="address-level2"
                    />
                    <TooltipFormikInput
                        name="country"
                        label="Country"
                        value={addressFormik.values.country}
                        onChange={addressFormik.handleChange}
                        onBlur={addressFormik.handleBlur}
                        placeholder="Country"
                        maxLength={255}
                        error={addressFormik.errors.country}
                        touched={addressFormik.touched.country}
                    />
                </Form>
                {addressError && <p className="error-message">{addressError}</p>}
                {addressSuccess && <p className="success-message">{addressSuccess}</p>}
            </div>
        </div>
    );
};

export default UserProfile;
