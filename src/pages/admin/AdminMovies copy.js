import React, { useState, useEffect } from 'react';
import { fetchLanguages, fetchMovies, fetchCategories, fetchActors, addMovie, updateMovie, deleteMovie } from '../../services/adminService';

const AdminMovies = () => {
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        releaseYear: '',
        language: '',
        filmLength: '',
        rentalDuration: '',
        rentalRate: '',
        replacementCost: '',
        rating: '',
        specialFeatures: '',
        categories: [],
        actors: []
    });
    const [editMovie, setEditMovie] = useState({
        id: null,
        title: '',
        description: '',
        releaseYear: '',
        language: '',
        filmLength: '',
        rentalDuration: '',
        rentalRate: '',
        replacementCost: '',
        rating: '',
        specialFeatures: '',
        categories: [],
        actors: []
    });
    const [showAddForm, setShowAddForm] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const ratings = ['G', 'PG', 'PG_13', 'R', 'NC_17'];

    useEffect(() => {
        fetchMovies()
            .then(setMovies)
            .catch(() => setError("Error fetching movies."));

        fetchLanguages()
            .then(setLanguages)
            .catch(() => setError("Error fetching languages."));

        fetchCategories()
            .then(setCategories)
            .catch(() => setError("Error fetching categories."));

        fetchActors()
            .then(setActors)
            .catch(() => setError("Error fetching actors."));
    }, []);

    const handleInputChange = (e, isEdit = false) => {
        const { name, value } = e.target;
        if (isEdit) {
            setEditMovie(prev => ({ ...prev, [name]: value }));
        } else {
            setNewMovie(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMultiSelectChange = (e, name, isEdit = false) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        if (isEdit) {
            setEditMovie(prev => ({ ...prev, [name]: selectedOptions }));
        } else {
            setNewMovie(prev => ({ ...prev, [name]: selectedOptions }));
        }
    };

    const handleAddButtonClick = () => {
        setShowAddForm(true);
        setShowUpdateForm(false);
        setNewMovie({
            title: '',
            description: '',
            releaseYear: '',
            language: '',
            filmLength: '',
            rentalDuration: '',
            rentalRate: '',
            replacementCost: '',
            rating: '',
            specialFeatures: '',
            categories: [],
            actors: []
        });
    };

    const handleRowClick = (movie) => {
        setEditMovie(movie);
        setShowUpdateForm(true);
        setShowAddForm(false);
    };

    const handleAddMovie = () => {
        setError(null);
        setSuccess(null);

        if (Object.values(newMovie).some(value => value === '' || value.length === 0)) {
            setError("All fields are required.");
            return;
        }

        addMovie(newMovie)
            .then(() => {
                setSuccess("Movie added successfully.");
                fetchMovies().then(setMovies);
                setShowAddForm(false);
            })
            .catch(err => setError(err.response?.data?.error || "Error adding movie."));
    };

    const handleUpdateMovie = () => {
        setError(null);
        setSuccess(null);

        if (Object.values(editMovie).some(value => value === '' || value.length === 0)) {
            setError("All fields are required for updating.");
            return;
        }

        updateMovie(editMovie)
            .then(() => {
                setSuccess("Movie updated successfully.");
                fetchMovies().then(setMovies);
                setShowUpdateForm(false);
            })
            .catch(err => setError(err.response?.data?.error || "Error updating movie."));
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
                <h2>Movie List<button className='add-button' style={{marginLeft: '2rem'}} onClick={handleAddButtonClick}>Add new movie</button></h2>
                <div className="admin-container-column">
                    <div className="admin-table-container admin-table-container-movie">
                        <table className="admin-table">
                            <thead className="admin-table-header">
                                <tr>
                                    <th style={{ width: '25%', textAlign: 'left' }}>Title</th>
                                    <th style={{ width: '13%' }}>Release Year</th>
                                    <th style={{ width: '13%' }}>Language</th>
                                    <th style={{ width: '13%' }}>Length</th>
                                    <th style={{ width: '13%' }}>Rating</th>
                                    <th style={{ width: '23%' }}>Actions</th>
                                    <td className='filler'></td>
                                </tr>
                            </thead>
                        </table>
                        <div className="admin-table-body">
                            <table className="admin-table">
                                <tbody>
                                    {movies.map(movie => (
                                        <tr key={movie.id}>
                                            <td style={{ width: '25%', textAlign: 'left' }}>{movie.title}</td>
                                            <td style={{ width: '13%' }}>{movie.releaseYear}</td>
                                            <td style={{ width: '13%' }}>{movie.language}</td>
                                            <td style={{ width: '13%' }}>{movie.filmLength}</td>
                                            <td style={{ width: '13%' }}>{movie.rating}</td>
                                            <td style={{ width: '23%' }}>
                                                <button className='update-button' onClick={() => handleRowClick(movie)}>Update</button>
                                                <button className='delete-button' onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showAddForm && (
                <div className="admin-container">
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
                        <input
                            type="text"
                            placeholder="Special Features"
                            name="specialFeatures"
                            value={newMovie.specialFeatures}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <select
                            name="language"
                            value={newMovie.language}
                            onChange={handleInputChange}
                            className="input-field"
                        >
                            <option value="">Select Language</option>
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.name}>{lang.name}</option>
                            ))}
                        </select>
                        <select
                            name="rating"
                            value={newMovie.rating}
                            onChange={handleInputChange}
                            className="input-field"
                        >
                            <option value="">Select Rating</option>
                            {ratings.map((rating) => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                        <select
                            name="categories"
                            value={newMovie.categories}
                            onChange={(e) => handleInputChange}
                            className="input-field"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <select
                            name="actors"
                            multiple
                            value={newMovie.actors}
                            onChange={(e) => handleMultiSelectChange(e, 'actors')}
                            className="input-field"
                        >
                            {actors.map(actor => (
                                <option key={actor.id} value={actor.name}>{actor.name}</option>
                            ))}
                        </select>
                        <button className="add-button" onClick={handleAddMovie}>Add</button>
                    </div>
                </div>
            )}

            {showUpdateForm && (
                <div className='admin-container'>
                    <h3>Edit Movie Details</h3>
                    <div className="input-wrapper column">
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={editMovie.title}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={editMovie.description}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Release Year"
                            name="releaseYear"
                            value={editMovie.releaseYear}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Length"
                            name="filmLength"
                            value={editMovie.filmLength}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Rental Duration"
                            name="rentalDuration"
                            value={editMovie.rentalDuration}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Rental Rate"
                            name="rentalRate"
                            value={editMovie.rentalRate}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Replacement Cost"
                            name="replacementCost"
                            value={editMovie.replacementCost}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Special Features"
                            name="specialFeatures"
                            value={editMovie.specialFeatures}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        />
                        <select
                            name="language"
                            value={editMovie.language}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        >
                            <option value="">Select Language</option>
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.name}>{lang.name}</option>
                            ))}
                        </select>
                        <select
                            name="rating"
                            value={editMovie.rating}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        >
                            <option value="">Select Rating</option>
                            {ratings.map((rating) => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                        <select
                            name="categories"
                            value={editMovie.categories}
                            onChange={(e) => handleInputChange(e, true)}
                            className="input-field"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <select
                            name="actors"
                            multiple
                            value={editMovie.actors}
                            onChange={(e) => handleMultiSelectChange(e, 'actors', true)}
                            className="input-field"
                        >
                            {actors.map(actor => (
                                <option key={actor.id} value={actor.firstName + " " + actor.lastName}>{actor.firstName + " " + actor.lastName}</option>
                            ))}
                        </select>
                        <button className="add-button" onClick={handleUpdateMovie}>Update</button>
                    </div>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default AdminMovies;