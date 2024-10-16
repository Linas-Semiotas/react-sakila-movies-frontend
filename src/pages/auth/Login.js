import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import Utils from '../../components/Utility';
import '../../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
    
        login(username, password)
            .then(data => {
                localStorage.setItem('token', data.token);
                navigate('/home');
            })
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred during login'));
    };

    return (
        <div className="login-container">
            <div className='page-title'>Login</div>
            <div className="login-wrapper">
                <div className="input-single">
                    <input
                        name='username'
                        placeholder='Username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={30}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="input-group">
                    <input
                        name='password'
                        placeholder='Password'
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={64}
                        required
                        autoComplete="current-password"
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
                <button className="login-button" onClick={handleLogin}>Login</button>
                {error && <p className="error-message">{error}</p>}
                <p className="register-link">
                    Don't have an account?&nbsp;
                    <Link to={`/register`}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
