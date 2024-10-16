import React, { useState, useEffect } from 'react';
import '../../styles/User.css';
import { getOrders } from '../../services/userService';
import Utils from '../../components/Utility';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper
} from '@mui/material';


const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getOrders()
            .then(data => setOrders(data))
            .catch(err => Utils.handleResponse(err, setError, 'An error occurred while fetching orders'));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            {error && <p className="error-message">Error fetching orders: {error.message}</p>}
            <Paper className="user-container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 480 }} aria-label="orders table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '20%' }}>
                                    Order Number
                                </TableCell>
                                <TableCell sx={{ width: '40%' }}>
                                    Movie
                                </TableCell>
                                <TableCell sx={{ width: '20%' }}>
                                    Rental Date
                                </TableCell>
                                <TableCell sx={{ width: '20%' }}>
                                    Return Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedOrders.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{new Date(row.rentalDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{row.returnDate ? new Date(row.returnDate).toLocaleDateString() : 'Not Returned'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    SelectProps={{
                        inputProps: { id: 'rows-per-page', name: 'rows-per-page' }
                    }}
                />
            </Paper>
        </div>
    );
};

export default UserOrders;
