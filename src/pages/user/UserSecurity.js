import { useState } from 'react';
import { changePassword } from '../../services/userService';
import Utils from '../../utils/Utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const UserSecurity = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRepeatPassword, setRepeatNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    
    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        if (newPassword !== newRepeatPassword) {
            Utils.handleResponse('', setError, "New passwords do not match");
            return;
        }
    
        changePassword(currentPassword, newPassword)
            .then((data) => {
                Utils.handleResponse(data, setSuccess, "Password changed successfully");
                setCurrentPassword('');
                setNewPassword('');
                setRepeatNewPassword('');
            })
            .catch(err => Utils.handleResponse(err, setError, "Error changing password"));
    };

    return (
        <div className="user-container">
            <h2>Change Password</h2>
            <form className="security-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='current-password'>Current Password</label>
                    <div className="input-wrapper">
                        <input
                            id='current-password'
                            name='current-password'
                            placeholder='Current password'
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span className='visibility-icon' onClick={toggleCurrentPasswordVisibility}>
                            <FontAwesomeIcon icon={showCurrentPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor='new-password'>New Password</label>
                    <div className="input-wrapper">
                        <input
                            id='new-password'
                            name='new-password'
                            placeholder='New password'
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span className='visibility-icon' onClick={toggleNewPasswordVisibility}>
                            <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor='repeat-new-password'>Repeat New Password</label>
                    <div className="input-wrapper">
                        <input
                            id='repeat-new-password'
                            name='repeat-new-password'
                            placeholder='New password'
                            type={showRepeatPassword  ? "text" : "password"}
                            value={newRepeatPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                            maxLength={64}
                            required
                        />
                        <span className='visibility-icon' onClick={toggleRepeatPasswordVisibility}>
                            <FontAwesomeIcon icon={showRepeatPassword  ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <button className="submit-button" type="submit">Update Password</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default UserSecurity;
