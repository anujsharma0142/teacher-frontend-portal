import React from 'react';
import { AppBar, Toolbar, Typography, Button, colors } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/tailweb.png';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }} >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo Image */}
                <img
                    src={logo}
                    alt="Teacher Portal Logo"
                    style={{ height: '25px', cursor: 'pointer' }} // Adjust size and style as needed
                    onClick={() => navigate('/home')} // Navigate to home on logo click
                />
                {/* Right-aligned buttons */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    {token ? (
                        <>
                            <Button color="inherit" component={Link} to="/home" >Home</Button>
                            <Button color="inherit" onClick={handleLogout} >Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
