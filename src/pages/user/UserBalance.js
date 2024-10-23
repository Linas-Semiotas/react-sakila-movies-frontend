import { useState, useEffect } from 'react';
import { AddButton } from '../../components/Button.js';
import { getBalance, addBalance } from '../../services/userService.js';
import Utils from '../../utils/utility';

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
                <AddButton text='Add 5$' onClick={() => handleAddBalance(5)}/>
                <AddButton text='Add 10$' onClick={() => handleAddBalance(10)}/>
                <AddButton text='Add 20$' onClick={() => handleAddBalance(20)}/>
                <AddButton text='Add 50$' onClick={() => handleAddBalance(50)}/>
            </div>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UserBalance;
