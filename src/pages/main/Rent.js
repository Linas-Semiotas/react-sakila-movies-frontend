import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Rent.css';
import { getRentalById, rentMovie  } from '../../services/rentalService';
import Utils from '../../components/Utility';
import { ConfirmationWindow } from '../../components/InfoWindows';

const Rent = () => {
    const { id } = useParams();
    const [rental, setRental] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getRentalById(id)
            .then(data => setRental(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching rental'));
    }, [id]);

    const handleRentMovie = async () => {
        if (rental.balance < rental.rentalRate) {
            setError('Insufficient balance to rent this movie. Please top up your account.');
            setSuccess('');
            return;
        }
        try {
            const response = await rentMovie(rental.id);
            Utils.handleResponse(response.data, setSuccess, 'You successfully rented a movie.')
            setError('');
        } catch (err) {
            Utils.handleResponse(err, setError, 'An error occurred during renting');
            setSuccess('');
        }
    };

    const handleRentClick = () => {
        setShowModal(true);
    };

    const handleConfirmRent = () => {
        handleRentMovie();
        setShowModal(false);
    };

    const handleCancelRent = () => {
        setShowModal(false);
    };

    return (
        <div className="rent-container">
            {rental.title ? (
                <div className="rental-card">
                    <h2>{rental.title}</h2>
                    <p><strong>Rental Rate: </strong>{rental.rentalRate} $</p>
                    <p><strong>Rental Duration: </strong>{rental.rentalDuration} days</p>
                    <p><strong>Replacement Cost: </strong>{rental.replacementCost} $</p>
                    <div className="balance-info">
                        Your Balance: {rental.balance} $
                    </div>
                    <button 
                        className={`rent-button ${rental.balance < rental.rentalRate ? 'disabled' : ''}`} 
                        onClick={handleRentClick} 
                        disabled={rental.balance < rental.rentalRate}
                    >
                        {rental.balance >= rental.rentalRate ? "Rent Now" : "Insufficient Balance"}
                    </button>
                    <ConfirmationWindow
                        show={showModal}
                        name="Confirmation"
                        message="Are you sure you want to rent this movie?"
                        onConfirm={handleConfirmRent}
                        onCancel={handleCancelRent}
                    />
                </div>
            ) : null}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default Rent;