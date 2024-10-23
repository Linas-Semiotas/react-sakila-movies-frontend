import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitButton } from '../../components/Button';
import { MainContainerMedium } from '../../components/Containers';
import { getRentalById, rentMovie  } from '../../services/rentalService';
import Utils from '../../utils/utility';

const Rent = () => {
    const { id } = useParams();
    const [rental, setRental] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getRentalById(id)
            .then(data => setRental(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching rental data'));
    }, [id]);

    const handleRentMovie = () => {
        if (rental.balance < rental.rentalRate) {
            Utils.handleResponse('', setError, 'Insufficient balance to rent this movie. Please top up your account.');
            setSuccess('');
            return;
        }
    
        rentMovie(rental.id)
            .then(response => {
                Utils.handleResponse(response, setSuccess, 'You successfully rented this movie.');
                setError('');
                return getRentalById(rental.id);
            })
            .then(updatedRental => {
                setRental(updatedRental);
            })
            .catch(err => {
                Utils.handleResponse(err, setError, 'An error occurred during renting');
                setSuccess('');
            });
    };

    const { handleClick, ConfirmationModal } = Utils.useConfirmation(
        handleRentMovie,
        "Confirmation",
        "Are you sure you want to rent this movie?"
    );

    return (
        <MainContainerMedium title="" padding='0'>
            {rental && rental.title ? (
                <div className="rental-card">
                    <h2>{rental.title}</h2>
                    <p><strong>Rental Rate: </strong>{rental.rentalRate}$</p>
                    <p><strong>Rental Duration: </strong>{rental.rentalDuration} days</p>
                    <p><strong>Replacement Cost: </strong>{rental.replacementCost}$</p>
                    <div className="balance-info">
                        Your Balance: {rental.balance}$
                    </div>
                    <SubmitButton 
                        text={rental.balance >= rental.rentalRate ? "Rent Now" : "Insufficient Balance"}
                        onClick={handleClick}
                        type='button'
                        isDisabled={rental.balance < rental.rentalRate}
                    />
                    <ConfirmationModal />
                </div>
            ) : null}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </MainContainerMedium>
    );
};

export default Rent;