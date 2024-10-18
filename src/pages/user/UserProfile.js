import React, { useState, useEffect } from 'react';
import { getPersonalInfo, updatePersonalInfo, getAddressInfo, updateAddressInfo } from '../../services/userService';
import Utils from '../../utils/Utility';

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

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleAddressInfoChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handlePersonalInfoSubmit = (e) => {
        e.preventDefault();
        updatePersonalInfo(personalInfo)
            .then(response => {
                Utils.handleResponse(response, setPersonalSuccess, 'Personal information updated successfully');
                setPersonalError('');
            })
            .catch(err => {
                Utils.handleResponse(err, setPersonalError, 'There was an error updating your personal information.');
                setPersonalSuccess('');
            });
    };

    const handleAddressInfoSubmit = (e) => {
        e.preventDefault();
        updateAddressInfo(addressInfo)
            .then(response => {
                Utils.handleResponse(response, setAddressSuccess, 'Address information updated successfully');
                setAddressError('');
            })
            .catch(err => {
                Utils.handleResponse(err, setAddressError, 'There was an error updating your address information.');
                setAddressSuccess('');
            });
    };

    return (
        <div>
            <div className="user-container">
                <h2>Personal Info</h2>
                <form onSubmit={handlePersonalInfoSubmit}>
                    <div className="input-group">
                        <label htmlFor='firstName'>First Name:</label>
                        <div className="input-wrapper">
                            <input
                                id='firstName'
                                maxLength={50}
                                placeholder='First name'
                                type="text" 
                                name="firstName" 
                                value={personalInfo.firstName || ''} 
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor='lastName'>Last Name:</label>
                        <div className="input-wrapper">
                            <input
                                id='lastName'
                                maxLength={50}
                                placeholder='Last name'
                                type="text" 
                                name="lastName" 
                                value={personalInfo.lastName || ''} 
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor='email'>Email:</label>
                        <div className="input-wrapper">
                            <input
                                id='email'
                                maxLength={255}
                                placeholder='Email'
                                type="email" 
                                name="email" 
                                value={personalInfo.email || ''} 
                                onChange={handlePersonalInfoChange} 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor='phone'>Phone:</label>
                        <div className="input-wrapper">
                            <input
                                id='phone'
                                maxLength={255}
                                placeholder='Phone number'
                                type="tel" 
                                name="phone" 
                                value={personalInfo.phone || ''} 
                                onChange={handlePersonalInfoChange} 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <button className="submit-button" type="submit">Save Changes</button>
                </form>
                {personalError && <p className="error-message">{personalError}</p>}
                {personalSuccess && <p className="success-message">{personalSuccess}</p>}
            </div>
            
            <div className="user-container">
                <h2>Address Info</h2>
                <form onSubmit={handleAddressInfoSubmit}>
                    <div className="input-group">
                        <label htmlFor='address'>Address:</label>
                        <input
                            id='address'
                            maxLength={255}
                            placeholder='Address'
                            type="text" 
                            name="address" 
                            value={addressInfo.address || ''} 
                            onChange={handleAddressInfoChange} 
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor='district'>District:</label>
                        <input
                            id='district'
                            maxLength={255}
                            placeholder='District'
                            type="text" 
                            name="district" 
                            value={addressInfo.district || ''} 
                            onChange={handleAddressInfoChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor='postCode'>Postal Code:</label>
                        <input
                            id='postCode'
                            maxLength={255}
                            placeholder='Postal Code'
                            type="text" 
                            name="postalCode" 
                            value={addressInfo.postalCode || ''} 
                            onChange={handleAddressInfoChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor='city'>City:</label>
                        <input
                            id='city'
                            maxLength={255}
                            placeholder='City'
                            type="text" 
                            name="city" 
                            value={addressInfo.city || ''} 
                            onChange={handleAddressInfoChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor='country'>Country:</label>
                        <input
                            id='country'
                            maxLength={255}
                            placeholder='Country'
                            type="text" 
                            name="country" 
                            value={addressInfo.country || ''} 
                            onChange={handleAddressInfoChange}
                            autoComplete="off"
                        />
                    </div>
                    <button className="submit-button" type="submit">Save Changes</button>
                </form>
                {addressError && <p className="error-message">{addressError}</p>}
                {addressSuccess && <p className="success-message">{addressSuccess}</p>}
            </div>
        </div>
    );
};

export default UserProfile;
