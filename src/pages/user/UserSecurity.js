import { useState } from 'react';
import { changePassword } from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const UserSecurity = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRepeatPassword, setRepeatNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (newPassword !== newRepeatPassword) {
            setError("New passwords do not match");
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            setSuccessMessage("Password updated successfully");
            setCurrentPassword('');
            setNewPassword('');
            setRepeatNewPassword('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Error changing password");
            } else {
                setError("Error changing password");
            }
        }
    };

    return (
        <div className="user-container">
            <h2>Change Password</h2>
            <form className="security-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Current Password</label>
                    <div className="input-wrapper">
                        <input
                            placeholder='Current password'
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span className='visibility-icon' onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label>New Password</label>
                    <div className="input-wrapper">
                        <input
                            placeholder='New password'
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span className='visibility-icon' onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label>Repeat New Password</label>
                    <div className="input-wrapper">
                        <input
                            placeholder='New password'
                            type={showPassword ? "text" : "password"}
                            value={newRepeatPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span className='visibility-icon' onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <button className="submit-button" type="submit">Update Password</button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default UserSecurity;
