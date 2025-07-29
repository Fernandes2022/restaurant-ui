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
    RESET_PASSWORD_FAILURE,
    SET_USER_PROFILE, // new action type
  } from './action-types';
  
  const initialState = {
    message: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    profile: null, // stores the logged-in user's profile
  
    forgotPassword: {
      loading: false,
      success: false,
      error: null,
    },
    resetPassword: {
      loading: false,
      success: false,
      error: null,
    },
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case AUTH_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload.message,
          token: action.payload.jwt,
          error: null,
        };
      case AUTH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGOUT:
        return {
          ...initialState,
          token: null,
          profile: null,
        };
  
      // Profile handling
      case SET_USER_PROFILE:
        return {
          ...state,
          profile: action.payload,
        };
  
      // Forgot Password
      case FORGOT_PASSWORD_REQUEST:
        return {
          ...state,
          forgotPassword: {
            ...state.forgotPassword,
            loading: true,
            error: null,
          },
        };
      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          forgotPassword: {
            ...state.forgotPassword,
            loading: false,
            success: true,
            error: null,
          },
        };
      case FORGOT_PASSWORD_FAILURE:
        return {
          ...state,
          forgotPassword: {
            ...state.forgotPassword,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
  
      // Reset Password
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          resetPassword: {
            ...state.resetPassword,
            loading: true,
            error: null,
          },
        };
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          resetPassword: {
            ...state.resetPassword,
            loading: false,
            success: true,
            error: null,
          },
        };
      case RESET_PASSWORD_FAILURE:
        return {
          ...state,
          resetPassword: {
            ...state.resetPassword,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  