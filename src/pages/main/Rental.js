import React, { useState, useEffect } from 'react';
import '../../styles/Rental.css';
import rentalService from '../../services/rentalService';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, TableSortLabel
} from '@mui/material';

const Rental = () => {
    const [rental, setRental] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        rentalService.getAllRentals()
            .then(data => setRental(data))
            .catch(err => setError(err));
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRentals = rental.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedRentals = [...filteredRentals].sort((a, b) => {
        if (orderBy === 'title') {
            return (order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        }
        if (orderBy === 'rentalRate') {
            return order === 'asc' ? a.rentalRate - b.rentalRate : b.rentalRate - a.rentalRate;
        }
        if (orderBy === 'replacementCost') {
            return order === 'asc' ? a.replacementCost - b.replacementCost : b.replacementCost - a.replacementCost;
        }
        if (orderBy === 'rentalDuration') {
            return order === 'asc' ? a.rentalDuration - b.rentalDuration : b.rentalDuration - a.rentalDuration;
        }
        return 0;
    });

    const paginatedRentals = sortedRentals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <div className='page-title'>Rental</div>
            <div className="rental-container">
                <div className='list-header'>
                    <input className='search' placeholder='Search' value={searchTerm} 
                        onChange={(e) => {setSearchTerm(e.target.value); setPage(0);}}/>
                </div>
                {error && <p className="error-message">Error fetching rentals: {error.message}</p>}
                <Paper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 480 }} aria-label="rental table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '40%' }}>
                                        <TableSortLabel
                                            active={orderBy === 'title'}
                                            direction={orderBy === 'title' ? order : 'asc'}
                                            onClick={() => handleRequestSort('title')}
                                        >
                                            Title
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ width: '20%' }}>
                                        <TableSortLabel
                                            active={orderBy === 'rentalRate'}
                                            direction={orderBy === 'rentalRate' ? order : 'asc'}
                                            onClick={() => handleRequestSort('rentalRate')}
                                        >
                                            Rental Rate
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ width: '20%' }}>
                                        <TableSortLabel
                                            active={orderBy === 'replacementCost'}
                                            direction={orderBy === 'replacementCost' ? order : 'asc'}
                                            onClick={() => handleRequestSort('replacementCost')}
                                        >
                                            Replacement Cost
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ width: '20%' }}>
                                        <TableSortLabel
                                            active={orderBy === 'rentalDuration'}
                                            direction={orderBy === 'rentalDuration' ? order : 'asc'}
                                            onClick={() => handleRequestSort('rentalDuration')}
                                        >
                                            Rental Duration
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRentals.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.rentalRate} $</TableCell>
                                        <TableCell>{row.replacementCost} $</TableCell>
                                        <TableCell>{row.rentalDuration} Days</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20]}
                        component="div"
                        count={rental.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default Rental;
