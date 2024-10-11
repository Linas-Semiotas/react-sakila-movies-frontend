import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import '../../styles/User.css';
import Orders from './UserOrders';
import Balance from './UserBalance';
import Profile from './UserProfile';
import Security from './UserSecurity';

const User = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const tabTitles = ['Orders', 'Balance', 'Profile', 'Security'];

    useEffect(() => {
        if (location.pathname === '/user/orders') {
            setValue(0);
        } else if (location.pathname === '/user/balance') {
            setValue(1);
        }
        else if (location.pathname === '/user/profile') {
            setValue(2);
        }
        else if (location.pathname === '/user/security') {
            setValue(3);
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate('/user/orders');
        } else if (newValue === 1) {
            navigate('/user/balance');
        }
        else if (newValue === 2) {
            navigate('/user/profile');
        }
        else if (newValue === 3) {
            navigate('/user/security');
        }
    };

    return (
        <div>
            <div className='page-title'>{tabTitles[value]}</div>
            <div className="user-main-container">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="user tabs" 
                        sx={{
                            '& .MuiTabs-indicator': {
                                height: '3px',
                                color: '#333',
                                backgroundColor: '#333',
                                borderRadius: '2px',
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                minWidth: 'auto',
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: '#333',
                                '&:hover': {
                                    backgroundColor: '#f4f4f4',
                                    color: '#222'
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#f4f4f4',
                                    color: '#222'
                                },
                            },
                        }}
                    >
                        <Tab label="Orders" />
                        <Tab label="Balance" />
                        <Tab label="Profile" />
                        <Tab label="Security" />
                    </Tabs>
                </Box>
                <Routes>
                    <Route path="/" element={<Navigate to="orders" />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="balance" element={<Balance />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="security" element={<Security />} />
                </Routes>
            </div>
        </div>
    );
};

export default User;
