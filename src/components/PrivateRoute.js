import {  useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken, getUserRoles } from '../services/authService';

const PrivateRoute = ({ children, requiredRoles }) => {
    const token = getToken();
    const userRoles = getUserRoles();
    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            //Go to error page if user in not logged in
            navigate('/error', { state: { errorCode: '401 - Unauthorized', errorMessage: 'Please log in to access this page.' } });
        } else if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
            //Go to error page if user's role is not authorized for that page
            navigate('/error', { state: { errorCode: '403 - Forbidden', errorMessage: 'You do not have permission to view this page.' } });
        }
    }, [token, userRoles, requiredRoles, navigate]);

    return children;
};

export default PrivateRoute;
