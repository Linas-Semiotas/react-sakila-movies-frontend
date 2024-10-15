import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Rent.css';
import { getRentalById, rentMovie  } from '../../services/rentalService';
import { ConfirmationWindow } from '../../components/InfoWindows';

const Rent = () => {
    const { id } = useParams();
    const [rental, setRental] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [canRent, setCanRent] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getRentalById(id)
            .then(data => {
                setRental(data);
                if (data.balance >= data.rentalRate) {
                    setCanRent(true);
                } else {
                    setError("Insufficient balance to rent this movie. Please top up your account.");
                }
            })
            .catch(() => setError("Error fetching rental details"));
    }, [id]);

    const handleRentMovie = async () => {
        if (canRent) {
            try {
                const response = await rentMovie(rental.id);
                setSuccess(response.data);
                setError('');
            } catch (error) {
                setError('Failed to process rental.');
                setSuccess('');
            }
        } else {
            setError('Insufficient balance to rent this movie. Please top up your account.');
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
            <div className="rental-card">
                <h2>{rental.title}</h2>
                <p><strong>Rental Rate: </strong>{rental.rentalRate} $</p>
                <p><strong>Rental Duration: </strong>{rental.rentalDuration} days</p>
                <p><strong>Replacement Cost: </strong>{rental.replacementCost} $</p>
                <div className="balance-info">
                    Your Balance: {rental.balance} $
                </div>
                <button 
                    className={`rent-button ${!canRent ? 'disabled' : ''}`} 
                    onClick={handleRentClick} 
                    disabled={!canRent}
                >
                    {canRent ? "Rent Now" : "Insufficient Balance"}
                </button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <ConfirmationWindow
                    show={showModal}
                    name="Confirmation"
                    message="Are you sure you want to rent this movie?"
                    onConfirm={handleConfirmRent}
                    onCancel={handleCancelRent}
                />
            </div>
        </div>
    );
};

export default Rent;