import React, { useState, useEffect } from 'react';
import '../../styles/Stores.css';
import storeService from '../../services/storeService';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        storeService.getAllStores()
            .then(data => setStores(data))
            .catch(err => setError(err));
    }, []);

    return (
        <div>
            <div className='page-title'>Our stores</div>
            <div className="stores-container">
                {error && <p className="error-message">Error fetching stores: {error.message}</p>}
                {stores.map(store => (
                    <div key={store.storeId} className="store-card">
                        <h2 className="store-title">{store.country} Address</h2>
                        <p className="store-info">{store.country}, {store.city}, {store.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stores;
