import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE
} from './action-types';
import { api } from '../../api';

// Get user profile
export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const response = await api.get('/api/user/profile');
      dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAILURE,
      payload: error.message
    });
  }
};
