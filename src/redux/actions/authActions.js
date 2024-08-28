import api from '../../utils/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (username, password) => async dispatch => {
    try {
        const response = await api.post('/auth/login', { username, password });
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token to localStorage
        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
        console.log(error);
        // Handle login failure
        throw new Error('Login failed. Please try again.');
    }
};

export const register = (username, password) => async dispatch => {
    try {
        const response = await api.post('/auth/register', { username, password });
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token to localStorage
        dispatch({ type: REGISTER_SUCCESS, payload: token });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || 'Registration failed' });
    }
};
