import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const PublicRoute = ({ children }) => {
    const token = getToken();

    if (token) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default PublicRoute;

