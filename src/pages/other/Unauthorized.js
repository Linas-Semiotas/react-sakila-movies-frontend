import React from 'react';

const Unauthorized = () => {
    return (
        <div className="home">
            <header>
                <div className='page-title'>Unauthorized</div>
            </header>
            <div className='home-container'>
                <p  className="error-message">You dont have access to this page.</p>   
            </div>
        </div>
    );
};

export default Unauthorized;