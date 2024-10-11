import { useState, useEffect } from 'react';
import { getBalance, addBalance } from '../../services/userService.js';

const UserBalance = () => {
    const [balance, setBalance] = useState(0.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchBalance() {
            try {
                const currentBalance = await getBalance();
                setBalance(currentBalance);
                setLoading(false);
            } catch (err) {
                setError('Error fetching balance');
                setLoading(false);
            }
        }

        fetchBalance();
    }, []);


    const handleAddBalance = async (amount) => {
        try {
            const newBalance = await addBalance(amount);
            setBalance(newBalance);
        } catch (err) {
            setError('Error updating balance');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-container">
            <h2>Current Balance: ${balance.toFixed(2)}</h2>
            <div className="balance-buttons">
                <button onClick={() => handleAddBalance(10)}>Add $10</button>
                <button onClick={() => handleAddBalance(20)}>Add $20</button>
                <button onClick={() => handleAddBalance(50)}>Add $50</button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UserBalance;
