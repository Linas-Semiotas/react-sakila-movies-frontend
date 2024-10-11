import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './styles/App.css';
import logo from './assets/images/sakila-logo.png';
import Home from './pages/main/Home';
import Movies from './pages/main/Movies';
import Movie from './pages/main/Movie';
import Rental from './pages/main/Rental';
import Stores from './pages/main/Stores';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import User from './pages/user/User';
import Admin from './pages/admin/Admin';
import Notes from './components/Notes';
import NotFound from './pages/other/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { getToken, logout } from './services/authService';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
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
                <div className="header-space-150 header-space-150-end">
                    {isLoggedIn ? (
                        <div className="nav-end-buttons">
                            <Link className="nav-end-button" to="/user">Profile</Link>
                            <div onClick={handleLogout} className="nav-end-button color-red color-red-200-hover">Logout</div>
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
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/*" element={<PrivateRoute><User /></PrivateRoute>} />
                    <Route path="/admin/*" element={<PrivateRoute><Admin /></PrivateRoute>} />
                    <Route path="/TODO" element={<Notes />} />
                    <Route path="*" element={<NotFound />} />
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
