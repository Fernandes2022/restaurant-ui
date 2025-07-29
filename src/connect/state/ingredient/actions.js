import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
  ADD_INGREDIENT_REQUEST,
  ADD_INGREDIENT_SUCCESS,
  ADD_INGREDIENT_FAILURE,
  UPDATE_INGREDIENT_REQUEST,
  UPDATE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_FAILURE,
  DELETE_INGREDIENT_REQUEST,
  DELETE_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_FAILURE
} from './action-types';
import { api } from '../../api';

// Fetch ingredients for a restaurant
export const fetchIngredients = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    const response = await api.get(`/api/admin/ingredients/restaurant/${restaurantId}`);
    dispatch({
      type: FETCH_INGREDIENTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_INGREDIENTS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch ingredients'
    });
    throw error;
  }
};

// Add ingredient category
export const addIngredientCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_INGREDIENT_REQUEST });
    const response = await api.post('/api/admin/ingredients/category', categoryData);
    dispatch({
      type: ADD_INGREDIENT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_INGREDIENT_FAILURE,
      payload: error.response?.data?.message || 'Failed to add ingredient category'
    });
    throw error;
  }
};

// Add ingredient item
export const addIngredientItem = (itemData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_INGREDIENT_REQUEST });
    const response = await api.post('/api/admin/ingredients', itemData);
    dispatch({
      type: ADD_INGREDIENT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_INGREDIENT_FAILURE,
      payload: error.response?.data?.message || 'Failed to add ingredient item'
    });
    throw error;
  }
};

// Update ingredient stock
export const updateIngredientStock = (id, stockData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INGREDIENT_REQUEST });
    const response = await api.put(`/api/admin/ingredients/${id}/stock`, stockData);
    dispatch({
      type: UPDATE_INGREDIENT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_INGREDIENT_FAILURE,
      payload: error.response?.data?.message || 'Failed to update ingredient stock'
    });
    throw error;
  }
};

// Fetch ingredients by category
export const fetchIngredientsByCategory = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    const response = await api.get(`/api/admin/ingredients/restaurant/${restaurantId}/category`);
    dispatch({
      type: FETCH_INGREDIENTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_INGREDIENTS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch ingredients by category'
    });
    throw error;
  }
};

