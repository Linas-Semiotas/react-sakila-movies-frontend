import { Navigate } from 'react-router-dom';
import { getToken, getUserRoles } from '../services/authService';

const PrivateRoute = ({ children, requiredRoles }) => {
    const token = getToken();
    const userRoles = getUserRoles();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
