import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';
import { getAllStores} from '../../services/storeService';
import { register } from '../../services/authService';
import Utils from '../../utils/Utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        setError('');
    
        register(username, password, firstName, lastName, email, selectedStore)
            .then(() => navigate('/register-success'))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred during registration'));
    };

    useEffect(() => {
        getAllStores()
            .then(data => setStores(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while getting stores'));
    }, []);

    return (
        <div className="register-container">
            <div className="page-title">Register</div>
            <div className="register-wrapper">
                <form onSubmit={handleRegistration}>
                    <div className="input-group">
                        <input
                            placeholder="First name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            maxLength={50}
                            required
                        />
                        <input
                            placeholder="Last name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className="input-single">
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={255}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Store location</label>
                        <select
                            value={selectedStore}
                            onChange={(e) => setSelectedStore(e.target.value)}
                            required
                        >
                            <option value="">Select a store</option>
                            {stores.map((store) => (
                                <option key={store.storeId} value={store.storeId}>{store.country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-single">
                        <input
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={30}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span 
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                    <button className="register-button" type="submit">Register</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Register;
