import React from 'react';

const NotFound = () => {
    return (
        <div className="home">
            <header>
                <div className='page-title'>Welcome to Sakila Movies</div>
            </header>
            <div className='home-container'>
                <p  className="error-message">404 page not found</p>   
            </div>
        </div>
    );
};

export default NotFound;