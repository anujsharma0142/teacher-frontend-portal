import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { TextField, Button, Container, Typography, Snackbar, CardContent, Card, InputAdornment, IconButton, Link } from '@mui/material';
import { Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AccountCircle, Lock } from '@mui/icons-material';
import Logo from '../../assets/tailweb.png';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(username, password));
            navigate('/home'); // Redirect to home page upon successful login
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Container 
            maxWidth="xs" 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh' 
            }}
        >
            <img src={Logo} alt="Logo" style={{ width: '150px', marginBottom: '40px' }} />
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                        <span style={{ marginLeft: '5px', marginRight: '5px' }}>|</span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                        <span style={{ marginLeft: '5px', marginRight: '5px' }}>|</span>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link href="#" underline="none" style={{ marginLeft: 'auto' }}>
                                Forgot Password?
                            </Link>
                        </div>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>
                        {error && (
                            <Snackbar 
                                open={!!error} 
                                autoHideDuration={6000} 
                                onClose={() => setError('')}
                            >
                                <Alert onClose={() => setError('')} severity="error">
                                    {error}
                                </Alert>
                            </Snackbar>
                        )}
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
