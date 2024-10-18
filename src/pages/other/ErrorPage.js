import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const errorCode = state?.errorCode || '404 - Not Found';
    const errorMessage = state?.errorMessage || 'The page you are looking for does not exist.';

    const handleButtonClick = () => {
        if (errorCode.startsWith('401')) {
            navigate('/login'); // Go to login page for 401
        } else if (errorCode.startsWith('403')) {
            navigate('/home'); // Go to homepage for 403
        } else if (errorCode.startsWith('404')) {
            navigate(-1); // Go back for 404
        } else {
            navigate(-1); // Default action for any other errors
        }
    };

    const buttonText = () => {
        if (errorCode.startsWith('401')) {
            return 'Go to Login';
        } else if (errorCode.startsWith('403')) {
            return 'Go to Homepage';
        } else if (errorCode.startsWith('404')) {
            return 'Go Back';
        } else {
            return 'Go Back';
        }
    };

    return (
        <div className="home">
            <div className='page-title'>{errorCode}</div>
            <div className='home-container'>
                <p className="error-message">{errorMessage}</p>
                <button className='common-button' onClick={handleButtonClick}>{buttonText()}</button>
            </div>
        </div>
    );
};

export default ErrorPage;