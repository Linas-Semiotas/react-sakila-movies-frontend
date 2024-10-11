import React, { useState, useEffect } from 'react';
import { getPersonalInfo, updatePersonalInfo, getAddressInfo, updateAddressInfo } from '../../services/userService';

const UserProfile = () => {
    const [personalInfoError, setPersonalInfoError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [personalInfoSuccess, setPersonalInfoSuccess] = useState(null);
    const [addressSuccess, setAddressSuccess] = useState(null);

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
            .then(response => {
                setPersonalInfo(response);
                setPersonalInfoError(null);
            })
            .catch(error => {
                console.error("Error fetching personal information:", error);
                setPersonalInfoError("There was an error loading your personal information. Please try again.");
            });

        getAddressInfo()
        .then(response => {
            setAddressInfo(response);
            setAddressError(null);
        })
        .catch(error => {
            console.error("Error fetching address information:", error);
            setAddressError("There was an error loading your address information. Please try again.");
        });

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
                setPersonalInfoSuccess('Personal information updated successfully');
                setPersonalInfoError(null); // Reset error after a successful update
            })
            .catch(error => {
                setPersonalInfoError("There was an error updating your personal information. Please try again.");
                setPersonalInfoSuccess(null); // Reset success if there's an error
            });
    };

    const handleAddressInfoSubmit = (e) => {
        e.preventDefault();
        updateAddressInfo(addressInfo)
            .then(() => {
                setAddressSuccess('Address information updated successfully');
                setAddressError(null);
            })
            .catch(error => {
                setAddressError("There was an error updating your address information. Please try again.");
                setAddressSuccess(null);
            });
    };

    return (
        <div>
            <div className="user-container">
                <h2>Personal Info</h2>
                <form onSubmit={handlePersonalInfoSubmit}>
                    <div className="input-group">
                        <label>First Name:</label>
                        <div className="input-wrapper">
                            <input 
                                placeholder='First name'
                                type="text" 
                                name="firstName" 
                                value={personalInfo.firstName || ''} 
                                onChange={handlePersonalInfoChange} 
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Last Name:</label>
                        <div className="input-wrapper">
                            <input 
                                placeholder='Last name'
                                type="text" 
                                name="lastName" 
                                value={personalInfo.lastName || ''} 
                                onChange={handlePersonalInfoChange} 
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Email:</label>
                        <div className="input-wrapper">
                            <input 
                                placeholder='Email'
                                type="email" 
                                name="email" 
                                value={personalInfo.email || ''} 
                                onChange={handlePersonalInfoChange} 
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Phone:</label>
                        <div className="input-wrapper">
                            <input 
                                placeholder='Phone number'
                                type="tel" 
                                name="phone" 
                                value={personalInfo.phone || ''} 
                                onChange={handlePersonalInfoChange} 
                            />
                        </div>
                    </div>
                    <button className="submit-button" type="submit">Save Changes</button>
                </form>
                {personalInfoError && <p className="error-message">{personalInfoError}</p>}
                {personalInfoSuccess && <p className="success-message">{personalInfoSuccess}</p>}
            </div>
            
            <div className="user-container">
                <h2>Address Info</h2>
                <form onSubmit={handleAddressInfoSubmit}>
                    <div className="input-group">
                        <label>Address:</label>
                        <input 
                            placeholder='Address'
                            type="text" 
                            name="address" 
                            value={addressInfo.address || ''} 
                            onChange={handleAddressInfoChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label>District:</label>
                        <input 
                            placeholder='District'
                            type="text" 
                            name="district" 
                            value={addressInfo.district || ''} 
                            onChange={handleAddressInfoChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Postal Code:</label>
                        <input 
                            placeholder='Postal Code'
                            type="text" 
                            name="postalCode" 
                            value={addressInfo.postalCode || ''} 
                            onChange={handleAddressInfoChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label>City:</label>
                        <input 
                            placeholder='City'
                            type="text" 
                            name="city" 
                            value={addressInfo.city || ''} 
                            onChange={handleAddressInfoChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Country:</label>
                        <input 
                            placeholder='Country'
                            type="text" 
                            name="country" 
                            value={addressInfo.country || ''} 
                            onChange={handleAddressInfoChange} 
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
