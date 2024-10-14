import React, { useState, useEffect } from 'react';
import { fetchLanguages, fetchMovies, fetchCategories, fetchActors, addMovie, updateMovie, deleteMovie } from '../../services/adminService';

const AdminMovies = () => {
    const [languages, setLanguages] = useState([]);
    const [category, setCategory] = useState([]);
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
        category: [],
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
        category: [],
        actors: []
    });
    const [showAddForm, setShowAddForm] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const ratings = ['G', 'PG', 'PG_13', 'R', 'NC_17'];

    useEffect(() => {
        fetchMovies()
            .then((data) => {
                setMovies(data);
                setFilteredMovies(data);
            })
            .catch(() => setError("Error fetching movies."));

        fetchLanguages()
            .then(setLanguages)
            .catch(() => setError("Error fetching languages."));

        fetchCategories()
            .then(setCategory)
            .catch(() => setError("Error fetching categories."));

        fetchActors()
            .then(setActors)
            .catch(() => setError("Error fetching actors."));
    }, []);

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
        );

        setFilteredMovies(filtered);
    };

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
            category: [],
            actors: []
        });
    };

    const handleRowClick = (movie) => {
        setEditMovie(movie);
        setShowUpdateForm(true);
        setShowAddForm(false);
    };

    const removeActor = (actorName, isEdit = false) => {
        if (isEdit) {
            setEditMovie(prev => ({
                ...prev,
                actors: prev.actors.filter(actor => actor !== actorName)
            }));
        } else {
            setNewMovie(prev => ({
                ...prev,
                actors: prev.actors.filter(actor => actor !== actorName)
            }));
        }
    };

    const removeCategory = (categoryName, isEdit = false) => {
        if (isEdit) {
            setEditMovie(prev => ({
                ...prev,
                category: prev.category.filter(categ => categ !== categoryName)
            }));
        } else {
            setNewMovie(prev => ({
                ...prev,
                category: prev.category.filter(categ => categ !== categoryName)
            }));
        }
    };

    const handleAddMovie = () => {
        setError(null);
        setSuccess(null);

        if (Object.values(newMovie).some(value => value === '' || value.length === 0)) {
            setError("All fields are required.");
            return;
        }

        addMovie(newMovie)
            .then((message) => {
                setSuccess(message);
                fetchMovies().then((data) => {
                    setMovies(data);
                    setFilteredMovies(data);
                });
                setShowAddForm(false);
            })
            .catch(err => {
                setError(err.message);
            });
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
                fetchMovies().then((data) => {
                    setMovies(data);
                    setFilteredMovies(data);
                });
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
            fetchMovies().then((data) => {
                setMovies(data);
                setFilteredMovies(data);
            });
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
                        <div className="input-wrapper search">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
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
                                    {filteredMovies.map(movie => (
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
            <div className="admin-container">
                <h3>{showAddForm ? "Add New Movie" : "Edit Movie Details"}</h3>
                <div className="form-row">
                    <div className="column-item">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={showAddForm ? newMovie.title : editMovie.title}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="input-field"
                        />

                        <label className="form-label" htmlFor="language">Language</label>
                        <select
                            name="language"
                            value={showAddForm ? newMovie.language : editMovie.language}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="select-field"
                        >
                            <option value="">Select Language</option>
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.name}>{lang.name}</option>
                            ))}
                        </select>

                        <label className="form-label" htmlFor="filmLength">Length</label>
                        <input
                            type="text"
                            placeholder="Length"
                            name="filmLength"
                            value={showAddForm ? newMovie.filmLength : editMovie.filmLength}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="input-field"
                        />

                        <label className="form-label" htmlFor="rentalDuration">Rental Duration</label>
                        <input
                            type="text"
                            placeholder="Rental Duration"
                            name="rentalDuration"
                            value={showAddForm ? newMovie.rentalDuration : editMovie.rentalDuration}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="input-field"
                        />
                    </div>

                    <div className="column-item">
                        <label className="form-label" htmlFor="releaseYear">Release Year</label>
                        <input
                            type="text"
                            placeholder="Release Year"
                            name="releaseYear"
                            value={showAddForm ? newMovie.releaseYear : editMovie.releaseYear}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="input-field"
                        />

                        <label className="form-label" htmlFor="rating">Rating</label>
                        <select
                            name="rating"
                            value={showAddForm ? newMovie.rating : editMovie.rating}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="select-field"
                        >
                            <option value="">Select Rating</option>
                            {ratings.map((rating) => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
     
                        <label className="form-label" htmlFor="replacementCost">Replacement Cost</label>
                        <input
                            type="text"
                            placeholder="Replacement Cost"
                            name="replacementCost"
                            value={showAddForm ? newMovie.replacementCost : editMovie.replacementCost}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="input-field"
                        />

                        <label className="form-label" htmlFor="rentalRate">Rental Rate</label>
                        <input
                            type="text"
                            placeholder="Rental Rate"
                            name="rentalRate"
                            value={showAddForm ? newMovie.rentalRate : editMovie.rentalRate}
                            onChange={(e) => handleInputChange(e, !showAddForm)}
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="full-width-item">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={showAddForm ? newMovie.description : editMovie.description}
                        onChange={(e) => handleInputChange(e, !showAddForm)}
                        className="textarea-field"
                    />
                </div>

                <div className="full-width-item">
                    <label className="form-label" htmlFor="specialFeatures">Special Features</label>
                    <input
                        placeholder="Special Features"
                        name="specialFeatures"
                        value={showAddForm ? newMovie.specialFeatures : editMovie.specialFeatures}
                        onChange={(e) => handleInputChange(e, !showAddForm)}
                        className="input-field"
                    />
                </div>

                <div className="form-row">

                    <div className="column-item">

                        <label className="form-label" htmlFor="actors">Actors</label>
                        <select
                            name="actors"
                            multiple
                            value={showAddForm ? newMovie.actors : editMovie.actors}
                            onChange={(e) => handleMultiSelectChange(e, 'actors', !showAddForm)}
                            className="select-multiple"
                        >
                            {actors.map(actor => (
                                <option key={actor.id} value={`${actor.firstName} ${actor.lastName}`}>{`${actor.firstName} ${actor.lastName}`}</option>
                            ))}
                        </select>

                        <label className="form-label">Selected Actors:</label>
                        <ul>
                            {(showAddForm ? newMovie.actors : editMovie.actors).map(actor => (
                                <li key={actor} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {actor}
                                    <button
                                        className='delete-button'
                                        onClick={() => removeActor(actor, !showAddForm)}
                                        style={{ marginLeft: '1rem' }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="column-item">

                        <label className="form-label" htmlFor="category">Categories</label>
                        <select
                            name="category"
                            multiple
                            value={showAddForm ? newMovie.category : editMovie.category}
                            onChange={(e) => handleMultiSelectChange(e, "category", !showAddForm)}
                            className="select-multiple"
                        >
                            {category.map(categ => (
                                <option key={categ.id} value={categ.name}>{categ.name}</option>
                            ))}
                        </select>

                        <label className="form-label">Selected Categories:</label>
                        <ul>
                            {(showAddForm ? newMovie.category : editMovie.category).map(categ => (
                                <li key={categ} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {categ}
                                    <button
                                        className='delete-button'
                                        onClick={() => removeCategory(categ, !showAddForm)}
                                        style={{ marginLeft: '1rem' }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>

                <div className="button-row">
                    {showUpdateForm && (
                        <button className="form-button add-button" onClick={handleUpdateMovie}>Update selected movie</button>
                    )}
                    {showAddForm && (
                        <button className="form-button add-button" onClick={handleAddMovie}>Add new movie</button>
                    )}
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>    
        </div>
    );
};

export default AdminMovies;