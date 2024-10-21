import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? <Navigate to="/home" /> : children;
};

export default PublicRoute;