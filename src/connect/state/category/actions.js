import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
} from './action-types';
import { api } from '../../api';

// Fetch categories for a restaurant
export const fetchCategories = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const response = await api.get(`/api/category/restaurant/${restaurantId}`);
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch categories'
    });
    throw error;
  }
};

// Add new category
export const addCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    const response = await api.post('/api/admin/category', categoryData);
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_FAILURE,
      payload: error.response?.data?.message || 'Failed to add category'
    });
    throw error;
  }
};

// Fetch categories for admin
export const fetchAdminCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const response = await api.get('/api/admin/category/restaurant');
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch admin categories'
    });
    throw error;
  }
};

