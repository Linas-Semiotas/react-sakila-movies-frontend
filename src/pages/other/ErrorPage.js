import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const errorCode = state?.errorCode || '404 - Not Found';
    const errorMessage = state?.errorMessage || 'The page you are looking for does not exist.';

    return (
        <div className="home">
            <div className='page-title'>{errorCode}</div>
            <div className='home-container'>
                <p className="error-message">{errorMessage}</p>
                <button className='common-button' onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;