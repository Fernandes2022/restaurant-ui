import axios from 'axios';
import { API_URL } from '../../api';
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    LOGOUT,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from './action-types';
import { getUserProfile } from '../user/actions';



// Signup
export const signup = (userData) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REQUEST });
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        const { jwt, message } = response.data;

        localStorage.setItem('token', jwt);

        dispatch({
            type: AUTH_SUCCESS,
            payload: { jwt, message }
        });

        dispatch(getUserProfile());
    } catch (error) {
        dispatch({
            type: AUTH_FAILURE,
            payload: error.response?.data?.message || 'Signup failed'
        });
        throw error;
    }
};

// Login
export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REQUEST });
        const response = await axios.post(`${API_URL}/auth/signin`, credentials);
        const { jwt, message } = response.data;

        localStorage.setItem('token', jwt);

        dispatch({
            type: AUTH_SUCCESS,
            payload: { jwt, message }
        });

        dispatch(getUserProfile());
    } catch (error) {
        dispatch({
            type: AUTH_FAILURE,
            payload: error.response?.data?.message || 'Login failed'
        });
        throw error;
    }
};

// Logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT }); // triggers full store reset
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data.message
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response?.data?.message || 'Failed to send reset email'
        });
        throw error;
    }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data.message
        });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response?.data?.message || 'Failed to reset password'
        });
        throw error;
    }
};
