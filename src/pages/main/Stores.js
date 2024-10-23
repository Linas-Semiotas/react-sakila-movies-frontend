import React, { useState, useEffect } from 'react';
import { MainContainer, InsideContainer } from '../../components/Containers';
import { getAllStores } from '../../services/storeService';
import Utils from '../../utils/utility';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllStores()
            .then(data => setStores(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching stores'));
    }, []);

    return (
        <MainContainer title="Our stores">
            {error && <p className="error-message">Error fetching stores: {error.message}</p>}
            {stores.map(store => (
                <InsideContainer key={store.storeId}>
                    <h2 className="store-title">{store.country} Address</h2>
                    <p className="store-info">{store.country}, {store.city}, {store.address}</p>
                </InsideContainer>
            ))}
        </MainContainer>
    );
};

export default Stores;
