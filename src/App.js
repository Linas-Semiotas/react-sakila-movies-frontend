import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './styles/App.css';
import logo from './assets/images/sakila-logo.png';
import Home from './pages/main/Home';
import Movies from './pages/main/Movies';
import Movie from './pages/main/Movie';
import Rental from './pages/main/Rental';
import Rent from './pages/main/Rent';
import Stores from './pages/main/Stores';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import User from './pages/user/User';
import Admin from './pages/admin/Admin';
import Notes from './components/Notes';
import ErrorPage from './pages/other/ErrorPage';
import RegisterSuccess from './pages/other/RegisterSuccess';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { getToken, getUserRoles, getUsername, logout } from './services/authService';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        setIsLoggedIn(false);
        setUserRoles([]);
        navigate('/login');
    },[navigate]);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
            setUserRoles(getUserRoles());
            setUsername(getUsername());

            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000;

            const timeout = expirationTime - Date.now();
            if (timeout > 0) {
                setTimeout(() => {
                    handleLogout();
                }, timeout);
            } else {
                handleLogout();
            }
        } else {
            setIsLoggedIn(false);
            setUserRoles([]);
            setUsername('');
        }
    }, [handleLogout]);

    useEffect(() => {
        setShowDropdown(false);
    }, [isLoggedIn]);

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-space-150 header-space-150-start"><img className="header-logo" src={logo} alt="logo" /></div>
                <nav className="nav">
                    <Link to="/home">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/rental">Rental</Link>
                    <Link to="/stores">Stores</Link>
                    <Link to="/TODO">TODO</Link>
                </nav>
                <div className="hamburger-icon" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faBars} />
                    <span>Menu</span>
                </div>
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <Link onClick={toggleMobileMenu} to="/home">Home</Link>
                        <Link onClick={toggleMobileMenu} to="/movies">Movies</Link>
                        <Link onClick={toggleMobileMenu} to="/rental">Rental</Link>
                        <Link onClick={toggleMobileMenu} to="/stores">Stores</Link>
                        <Link onClick={toggleMobileMenu} to="/TODO">TODO</Link>
                    </div>
                )}
                <div className="header-space-150 header-space-150-end">
                    {isLoggedIn ? (
                        <div className="profile-dropdown">
                            <div className="profile-button" onClick={toggleDropdown}>
                                {username || "Profile"}&nbsp;&nbsp;
                                <FontAwesomeIcon style={{fontSize: "10px"}} icon={faChevronDown} />
                            </div>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {userRoles.includes('ROLE_USER') && (
                                        <>
                                            <Link onClick={toggleDropdown} to="/user/orders" className="dropdown-item">Orders</Link>
                                            <Link onClick={toggleDropdown} to="/user/balance" className="dropdown-item">Balance</Link>
                                            <Link onClick={toggleDropdown} to="/user/profile" className="dropdown-item">Profile</Link>
                                            <Link onClick={toggleDropdown} to="/user/security" className="dropdown-item">Security</Link>
                                        </>
                                    )}
                                    {userRoles.includes('ROLE_ADMIN') && (
                                        <Link onClick={toggleDropdown} to="/admin" className="dropdown-item">Admin</Link>
                                    )}
                                    <div onClick={handleLogout} className="dropdown-item logout-button">Logout</div>
                                </div>
                            )}
                        </div>                       
                    ) : (
                        <Link to="/login" className="nav-end-button">Sign in</Link>
                    )}
                </div>
            </header>

            <div className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<Movie />} />
                    <Route path="/rental" element={<PrivateRoute><Rental /></PrivateRoute>} />
                    <Route path="/rental/:id" element={<PrivateRoute><Rent /></PrivateRoute>} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                    <Route path="/user/*" element={<PrivateRoute requiredRoles={["ROLE_USER"]}><User /></PrivateRoute>} />
                    <Route path="/admin/*" element={<PrivateRoute requiredRoles={["ROLE_ADMIN"]}><Admin /></PrivateRoute>} />
                    <Route path="/TODO" element={<Notes />} />
                    <Route path="/register-success" element={<RegisterSuccess />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>

            <footer className="footer">
                <p>© 2024 Sakila Movies</p>
            </footer>
        </div>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
