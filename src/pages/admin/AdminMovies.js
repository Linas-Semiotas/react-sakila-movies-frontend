import React, { useState, useEffect } from 'react';
import { fetchMovies, addMovie, deleteMovie } from '../../services/adminService';

const AdminMovies = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        releaseYear: '',
        language: '',
        rentalDuration: '',
        rentalRate: '',
        filmLength: '',
        replacementCost: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchMovies()
            .then(setMovies)
            .catch(() => setError("Error fetching movies."));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie(prev => ({ ...prev, [name]: value }));
    };

    const handleRowClick = (movie) => {
        setNewMovie({
            title: movie.title,
            description: movie.description,
            releaseYear: movie.releaseYear,
            language: movie.language,
            rentalDuration: movie.rentalDuration,
            rentalRate: movie.rentalRate,
            filmLength: movie.filmLength,
            replacementCost: movie.replacementCost
        });
    };

    const handleAddMovie = () => {
        setError(null);
        setSuccess(null);

        // Validate that all fields are filled
        const { title, description, releaseYear, language, rentalDuration, rentalRate, filmLength, replacementCost } = newMovie;
        if (!title || !description || !releaseYear || !language || !rentalDuration || !rentalRate || !filmLength || !replacementCost) {
            setError("All fields are required.");
            return;
        }

        addMovie(newMovie)
            .then(() => {
                setSuccess("Movie added successfully.");
                setNewMovie({
                    title: '',
                    description: '',
                    releaseYear: '',
                    language: '',
                    rentalDuration: '',
                    rentalRate: '',
                    filmLength: '',
                    replacementCost: ''
                });
                fetchMovies().then(setMovies);
            })
            .catch(err => setError(err.response?.data?.error || "Error adding movie."));
    };

    const handleDeleteMovie = async (movieId) => {
        setError(null);
        setSuccess(null);
        try {
            await deleteMovie(movieId);
            setSuccess('Movie deleted successfully.');
            fetchMovies().then(setMovies);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error deleting movie. It might be in use.';
            setError(errorMessage);
        }
    };

    return (
        <div>
            <div className="admin-container">
                <h2>Movie List</h2>
                <div className="admin-container-column">
                    <div className="admin-table-container admin-table-container-movie">
                        <table className="admin-table">
                            <thead className="admin-table-header">
                                <tr>
                                    <th style={{ width: '19%', textAlign: 'left' }}>Title</th>
                                    <th style={{ width: '10%' }}>Release Year</th>
                                    <th style={{ width: '13%' }}>Language</th>
                                    <th style={{ width: '10%' }}>Length</th>
                                    <th style={{ width: '16%' }}>Rental Duration</th>
                                    <th style={{ width: '16%' }}>Rental Rate</th>
                                    <th style={{ width: '16%' }}>Replacement Cost</th>
                                    <th className='filler'></th>
                                </tr>
                            </thead>
                        </table>
                        <div className="admin-table-body">
                            <table className="admin-table">
                                <tbody>
                                    {movies.map(movie => (
                                        <tr key={movie.id} onClick={() => handleRowClick(movie)}>
                                            <td style={{ width: '19%', textAlign: 'left' }}>{movie.title}</td>
                                            <td style={{ width: '10%' }}>{movie.releaseYear}</td>
                                            <td style={{ width: '13%' }}>{movie.language}</td>
                                            <td style={{ width: '10%' }}>{movie.filmLength}</td>
                                            <td style={{ width: '16%' }}>{movie.rentalDuration}</td>
                                            <td style={{ width: '16%' }}>{movie.rentalRate}</td>
                                            <td style={{ width: '16%' }}>{movie.replacementCost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin-container">
                <div className="admin-details admin-details-movie">
                    <h3>Add New Movie</h3>
                    <div className="input-wrapper column">
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={newMovie.title}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={newMovie.description}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Release Year"
                            name="releaseYear"
                            value={newMovie.releaseYear}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Language"
                            name="language"
                            value={newMovie.language}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Length"
                            name="filmLength"
                            value={newMovie.filmLength}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Rental Duration"
                            name="rentalDuration"
                            value={newMovie.rentalDuration}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Rental Rate"
                            name="rentalRate"
                            value={newMovie.rentalRate}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Replacement Cost"
                            name="replacementCost"
                            value={newMovie.replacementCost}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <button className="add-button" onClick={handleAddMovie}>Add</button>
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
            <div className='admin-container'>
                <div className="admin-details admin-details-movie">
                    <h3>Edit Movie</h3>
                    <div className="input-wrapper column">
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={newMovie.title}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={newMovie.description}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Release Year"
                            name="releaseYear"
                            value={newMovie.releaseYear}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Language"
                            name="language"
                            value={newMovie.language}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Length"
                            name="filmLength"
                            value={newMovie.filmLength}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Rental Duration"
                            name="rentalDuration"
                            value={newMovie.rentalDuration}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Rental Rate"
                            name="rentalRate"
                            value={newMovie.rentalRate}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Replacement Cost"
                            name="replacementCost"
                            value={newMovie.replacementCost}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <button className="add-button" onClick={handleAddMovie}>Update</button>
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default AdminMovies;
