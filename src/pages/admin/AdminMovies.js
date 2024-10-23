import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { movieSchema } from '../../utils/schemas';
import { TooltipFormikInput, TooltipFormikSelect, TooltipFormikTextArea, Label, SimpleInput } from '../../components/Input';
import { Form } from '../../components/Form';
import { DeleteButton, UpdateButton, AddButton, SubmitButton } from '../../components/Button';
import { fetchLanguages, fetchMovies, fetchCategories, fetchActors, addMovie, updateMovie, deleteMovie } from '../../services/adminService';
import Utils from '../../utils/utility';

const AdminMovies = () => {
    const initialMovieForm = () => ({
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

    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [movieFormState, setMovieFormState] = useState(initialMovieForm());
    const [showAddForm, setShowAddForm] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const ratings = ['G', 'PG', 'PG13', 'R', 'NC17'];

    useEffect(() => {
        fetchMoviesData();
        fetchDropdownData();
    }, []);

    const fetchMoviesData = () => {
        fetchMovies()
            .then(data => {
                setMovies(data);
                setFilteredMovies(data);
            })
            .catch(err => Utils.handleResponse(err, setError, "Error fetching movies."));
    };

    const fetchDropdownData = () => {
        fetchLanguages().then(setLanguages).catch(err => Utils.handleResponse(err, setError, "Error fetching languages."));
        fetchCategories().then(setCategories).catch(err => Utils.handleResponse(err, setError, "Error fetching categories."));
        fetchActors().then(setActors).catch(err => Utils.handleResponse(err, setError, "Error fetching actors."));
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
        const filtered = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        setFilteredMovies(filtered);
    };

    const handleAddButtonClick = () => {
        Utils.resetResponse(setError, setSuccess);
        setShowAddForm(true);
        setMovieFormState(initialMovieForm());
    };

    const handleRowClick = (movie) => {
        Utils.resetResponse(setError, setSuccess);
        setMovieFormState(movie);
        setShowAddForm(false);
    };

    const handleSubmitMovie = (values, isEdit = false) => {
        Utils.resetResponse(setError, setSuccess);
        const action = isEdit ? updateMovie : addMovie;

        action(values)
            .then(response => {
                Utils.handleResponse(response, setSuccess, isEdit ? 'Movie updated successfully.' : 'Movie added successfully.');
                fetchMoviesData();
                if (!isEdit) setShowAddForm(false);
            })
            .catch(err => Utils.handleResponse(err, setError, `Error ${isEdit ? 'updating' : 'adding'} movie.`));
    };

    const handleDeleteMovie = (movieId) => {
        Utils.resetResponse(setError, setSuccess);
        deleteMovie(movieId)
            .then(response => {
                Utils.handleResponse(response, setSuccess, 'Movie deleted successfully.');
                fetchMoviesData();
            })
            .catch(err => Utils.handleResponse(err, setError, 'Error deleting movie. It might be in use.'));
    };

    const { handleClickVar, ConfirmationModal } = Utils.useConfirmation(
        handleDeleteMovie,
        "Confirmation",
        "Are you sure you want to delete this movie?"
    );

    return (
        <div>
            <div className="admin-container">
                <h2>Movie List&emsp;<AddButton text='Add new movie' onClick={handleAddButtonClick} /></h2>
                <div className="admin-container-column">
                    <div className="admin-table-container admin-table-container-movie">
                        <SimpleInput 
                            name="search"
                            maxLength={50}
                            placeholder="Search for movies..."
                            value={search}
                            onChange={handleSearchChange}
                        />
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
                                                <UpdateButton onClick={() => handleRowClick(movie)} />
                                                <DeleteButton onClick={() => handleClickVar(movie.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ConfirmationModal />
            </div>
            <div className="admin-container">
                <h3>{showAddForm ? "Add New Movie" : "Edit Movie Details"}</h3>
                <Formik
                    initialValues={movieFormState}
                    validationSchema={movieSchema}
                    onSubmit={(values) => handleSubmitMovie(values, !showAddForm)}
                    enableReinitialize
                >
                    {({ values, handleChange, handleBlur, touched, errors, setFieldValue, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="column-item">
                                    <TooltipFormikInput
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Title"
                                        error={errors.title}
                                        touched={touched.title}
                                        label="Title"
                                    />

                                    <TooltipFormikSelect
                                        name="language"
                                        value={values.language}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.language}
                                        touched={touched.language}
                                        label="Language"
                                        options={languages}
                                        optionKey="id"
                                        optionLabel="name"
                                    />

                                    <TooltipFormikInput
                                        name="filmLength"
                                        value={values.filmLength}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Length"
                                        error={errors.filmLength}
                                        touched={touched.filmLength}
                                        label="Film Length"
                                    />

                                    <TooltipFormikInput
                                        name="rentalDuration"
                                        value={values.rentalDuration}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Rental Duration"
                                        error={errors.rentalDuration}
                                        touched={touched.rentalDuration}
                                        label="Rental Duration"
                                    />
                                </div>

                                <div className="column-item">
                                    <TooltipFormikInput
                                        name="releaseYear"
                                        value={values.releaseYear}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Release Year"
                                        error={errors.releaseYear}
                                        touched={touched.releaseYear}
                                        label="Release Year"
                                    />

                                    <TooltipFormikSelect
                                        name="rating"
                                        value={values.rating}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.rating}
                                        touched={touched.rating}
                                        label="Rating"
                                        options={ratings}
                                        isSimple={true}
                                    />

                                    <TooltipFormikInput
                                        name="replacementCost"
                                        value={values.replacementCost}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Replacement Cost"
                                        error={errors.replacementCost}
                                        touched={touched.replacementCost}
                                        label="Replacement Cost"
                                    />

                                    <TooltipFormikInput
                                        name="rentalRate"
                                        value={values.rentalRate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Rental Rate"
                                        error={errors.rentalRate}
                                        touched={touched.rentalRate}
                                        label="Rental Rate"
                                    />
                                </div>
                            </div>

                            <div className="full-width-item">
                                <TooltipFormikTextArea
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Description"
                                    error={errors.description}
                                    touched={touched.description}
                                    label="Description"
                                />
                            </div>

                            <div className="full-width-item">
                                <TooltipFormikInput
                                    name="specialFeatures"
                                    value={values.specialFeatures}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Special Features"
                                    error={errors.specialFeatures}
                                    touched={touched.specialFeatures}
                                    label="Special Features"
                                />
                            </div>

                            <div className="form-row">
                                <div className="column-item">
                                    <TooltipFormikSelect
                                        name="actors"
                                        value={values.actors}
                                        onChange={(e) => {
                                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                            setFieldValue('actors', selectedOptions);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.actors}
                                        touched={touched.actors}
                                        label="Actors"
                                        options={actors.map(actor => ({
                                            id: actor.id,
                                            name: `${actor.firstName} ${actor.lastName}`
                                        }))}
                                        optionKey="id"
                                        optionLabel="name"
                                        multiple={true}
                                    />

                                    <Label text="Selected Actors:"/>
                                    <ul>
                                        {values.actors && values.actors.map(actorName => (
                                            <li key={actorName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                {actorName}
                                                <DeleteButton
                                                    text='Remove'
                                                    onClick={() => {
                                                        const updatedActors = values.actors.filter(name => name !== actorName);
                                                        setFieldValue('actors', updatedActors);
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="column-item">
                                    <TooltipFormikSelect
                                        name="category"
                                        value={values.category}
                                        onChange={(e) => {
                                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                            setFieldValue('category', selectedOptions);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.category}
                                        touched={touched.category}
                                        label="Categories"
                                        options={categories}
                                        optionKey="id"
                                        optionLabel="name"
                                        multiple={true}
                                    />

                                    <Label text="Selected Categories:"/>
                                    <ul>
                                        {values.category && values.category.map(categId => {
                                            const categoryName = categories.find(c => c.id === categId)?.name || categId;
                                            return (
                                                <li key={categId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    {categoryName}
                                                    <DeleteButton
                                                    text='Remove'
                                                    onClick={() => {
                                                        const updatedCategories = values.category.filter(id => id !== categId);
                                                        setFieldValue('category', updatedCategories);
                                                    }}
                                                />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div style={{marginTop: "20px"}}>
                                {showAddForm ? (
                                    <SubmitButton text="Add new movie" />
                                ) : (
                                    <SubmitButton text="Update selected movie" />
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default AdminMovies;