import { useState, useEffect } from 'react';
import { getBalance, addBalance } from '../../services/userService.js';
import Utils from '../../utils/Utility';

const UserBalance = () => {
    const [balance, setBalance] = useState(0.0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getBalance()
            .then(data => setBalance(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching balance'));
    }, []);

    const handleAddBalance = (amount) => {
        addBalance(amount)
            .then(newBalance => {
                setBalance(newBalance)
                Utils.handleResponse(newBalance, setSuccess, amount + '$ added to balance successfully')
            })
            .catch(err => Utils.handleResponse(err, setError, 'Error adding balance'));
    };

    return (
        <div className="user-container">
            <h2>Current Balance: ${balance.toFixed(2)}</h2>
            <div className="balance-buttons">
                <button onClick={() => handleAddBalance(5)}>Add 5$</button>
                <button onClick={() => handleAddBalance(10)}>Add 10$</button>
                <button onClick={() => handleAddBalance(20)}>Add 20$</button>
                <button onClick={() => handleAddBalance(50)}>Add 50$</button>
            </div>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UserBalance;
