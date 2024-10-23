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
import ErrorPage from './pages/other/ErrorPage';
import RegisterSuccess from './pages/other/RegisterSuccess';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AppContainer, AppLayout } from './components/Containers';
import { getUserInfo, logout, refreshToken } from './services/authService';
import { ExpirationTime, IdleTime } from './utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        setIsLoggedIn(false);
        setUserInfo(null);
        setShowDropdown(false);
        navigate('/login');
    }, [navigate]);

    const toggleMobileMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
        setShowDropdown(false);
    }, []);

    const toggleDropdown = useCallback(() => {
        setShowDropdown((prev) => !prev);
        setIsMenuOpen(false);
    }, []);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const userInfo = await getUserInfo();
            if (userInfo && userInfo.username) { // If backend returned user info
                setIsLoggedIn(true);
                setUserInfo(userInfo); 
            } else {
                setIsLoggedIn(false);
                setUserInfo(null);
            }
            setLoading(false);
        };
    
        checkAuthStatus(); // Check authentication status on page load
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const refreshBeforeExpiration = ExpirationTime - IdleTime; // 5 minutes before token expiration. You can change times in config

            const interval = setTimeout(() => {
                refreshToken()
                    .then(newToken => {
                        if (newToken) {
                            console.log("Token refreshed successfully");
                        } else {
                            console.log("Failed to refresh token");
                            handleLogout(); // Log out if refresh fails
                        }
                    });
            }, refreshBeforeExpiration);

            return () => clearInterval(interval); // Clear interval on component unmount
        }
    }, [isLoggedIn, handleLogout]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                toggleDropdown();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [toggleDropdown]);

    if (loading) {
        return <div>Loading...</div>; // Display while waiting for the auth check to complete
    }

    return (
        <AppLayout>
            <header className="header">
                <div className="header-space-150 header-space-150-start"><img className="header-logo" src={logo} alt="logo" /></div>
                <nav className="nav">
                    <Link to="/home">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/rental">Rental</Link>
                    <Link to="/stores">Stores</Link>
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
                    </div>
                )}
                <div className="header-space-150 header-space-150-end">
                    {isLoggedIn ? (
                        <div className="profile-dropdown">
                            <div className="profile-button" onClick={toggleDropdown}>
                                {userInfo?.username || "Profile"}&nbsp;&nbsp;
                                <FontAwesomeIcon style={{fontSize: "10px"}} icon={faChevronDown} />
                            </div>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {userInfo?.roles?.includes('ROLE_USER') && (
                                        <>
                                            <Link onClick={toggleDropdown} to="/user/orders" className="dropdown-item">Orders</Link>
                                            <Link onClick={toggleDropdown} to="/user/balance" className="dropdown-item">Balance</Link>
                                            <Link onClick={toggleDropdown} to="/user/profile" className="dropdown-item">Profile</Link>
                                            <Link onClick={toggleDropdown} to="/user/security" className="dropdown-item">Security</Link>
                                        </>
                                    )}
                                    {userInfo?.roles?.includes('ROLE_ADMIN') && (
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

            <AppContainer>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<Movie />} />
                    <Route path="/rental" element={<PrivateRoute isLoggedIn={isLoggedIn}><Rental /></PrivateRoute>} />
                    <Route path="/rental/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><Rent /></PrivateRoute>} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn} loading={loading}><Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} /></PublicRoute>} />
                    <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn} loading={loading}><Register /></PublicRoute>} />
                    <Route path="/user/*" element={<PrivateRoute isLoggedIn={isLoggedIn} userRoles={userInfo?.roles} requiredRoles={["ROLE_USER"]}><User /></PrivateRoute>} />
                    <Route path="/admin/*" element={<PrivateRoute isLoggedIn={isLoggedIn} userRoles={userInfo?.roles} requiredRoles={["ROLE_ADMIN"]}><Admin /></PrivateRoute>} />
                    <Route path="/register-success" element={<RegisterSuccess />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </AppContainer>

            <footer className="footer">
                <p>© 2024 Sakila Movies</p>
            </footer>
        </AppLayout>
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
