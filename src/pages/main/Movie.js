import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/Movie.css';
import { getMovieById } from '../../services/movieService';
import Utils from '../../utils/Utility';

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getMovieById(id)
            .then(data => setMovie(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching movie'));
    }, [id]);

    return (
        <div className="movie-container">
            {movie ? (
                <div>
                    <div className="movie-header">
                        <img
                            className="movie-poster"
                            src={movie.imageUrl || "https://via.placeholder.com/300x450?text=No+Image+Available"}
                            alt={movie.title}
                        />
                        <div className="movie-info">
                            <h1 className="movie-title">{movie.title} ({movie.releaseYear})</h1>
                            <p className="movie-info"><strong>Category:</strong> {movie.category}</p>
                            <p className="movie-info"><strong>Duration:</strong> {movie.filmLength} min.</p>
                            <p className="movie-info"><strong>Rating:</strong> {movie.rating}</p>
                            <p className="movie-info"><strong>Language:</strong> {movie.language}</p>
                            <p className="movie-info"><strong>Special features:</strong> {movie.specialFeatures}</p>
                            <p className="movie-info"><strong>Stars: </strong>
                                {movie.actors.map(actor => actor).join(" • ")}
                            </p>

                        </div>
                    </div>
                    <p className="movie-description">{movie.description}</p>
                    <Link to={`/rental/${movie.id}`} key={movie.id} className='link-button'>Go to rent page</Link>
                </div>
            ) : null}
            {error && <p  className="error-message">{error}</p>}
        </div>
    );
};

export default Movie;