import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn, userRoles = [], requiredRoles = [] }) => {

    if (!isLoggedIn) {
        return <Navigate to="/error" state={{ errorCode: '401 - Unauthorized', errorMessage: 'Please log in to access this page.' }} />;
    }

    if (requiredRoles.length > 0 && !requiredRoles.some(role => userRoles.includes(role))) {
        return <Navigate to="/error" state={{ errorCode: '403 - Forbidden', errorMessage: 'You do not have permission to view this page.' }} />;
    }

    return children; // Render the protected route
};

export default PrivateRoute;
