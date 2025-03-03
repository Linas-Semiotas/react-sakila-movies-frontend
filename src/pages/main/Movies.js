import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SimpleInput } from '../../components/Input';
import { Box, Card, CardContent, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import { MainContainer } from '../../components/Containers';
import { getAllMovies } from '../../services/movieService';
import Utils from '../../utils/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Movies = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllMovies()
            .then(data => setMovies(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching movies'));
    }, []);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const languages = [...new Set(movies.map(movie => movie.language))];
    const categories = [...new Set(movies.map(movie => movie.category))];
    const years = [...new Set(movies.map(movie => movie.releaseYear))];

    const filteredMovies = movies.filter(movie => {
        const categoryMatch = selectedCategory === '' || (Array.isArray(movie.category) && movie.category.includes(selectedCategory));
        return (
            (selectedLanguage === '' || movie.language === selectedLanguage) &&
            categoryMatch  &&
            (selectedYear === '' || movie.releaseYear === parseInt(selectedYear)) &&
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMoviesPage = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <MainContainer title="Movies" padding='0px'>
            {error && <p  className="error-message">{error.message}</p>}
            <div className='gallery-header'>
                <div onClick={toggleFilter} className='filter-button'>
                    <FontAwesomeIcon icon={faFilter} />
                    &nbsp;Filter
                </div>
                <SimpleInput 
                    name="search"
                    maxLength={100}
                    placeholder="Search for movies..."
                    value={searchTerm} 
                    onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                    margin="0px 5px"
                />
            </div>
            <div>
                {isFilterOpen && (
                    <div className='filter-container'>
                        <div className='filter-options'>
                            <label htmlFor='language'>Language</label><br />
                            <select
                                id="language"
                                value={selectedLanguage}
                                onChange={(e) => {setSelectedLanguage(e.target.value); setCurrentPage(1);}}
                            >
                                <option value="">All languages</option>
                                {languages.map((language, index) => (
                                    <option key={index} value={language}>{language}</option>
                                ))}
                            </select>
                        </div>
                        <div className='filter-options'>
                            <label htmlFor='category'>Category</label><br />
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => {setSelectedCategory(e.target.value); setCurrentPage(1);}}
                            >
                                <option value="">All categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='filter-options'>
                        <label htmlFor='year'>Year</label><br />
                            <select
                                id="year"
                                value={selectedYear}
                                onChange={(e) => {setSelectedYear(e.target.value); setCurrentPage(1);}}
                            >
                                <option value="">All years</option>
                                {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ width: "100%", margin: 0, paddingRight: 2}}>
                    {currentMoviesPage.map(movie => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{ 
                                    width: "100%",
                                    height: "200px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {movie.releaseYear}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <div className="pagination">
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange}
                    variant="outlined"
                    color='primary'
                />
            </div>
        </MainContainer>
    );
};

export default Movies;