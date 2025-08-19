import { api } from '../../api';
import {
    FETCH_MENU_ITEMS_REQUEST,
    FETCH_MENU_ITEMS_SUCCESS,
    FETCH_MENU_ITEMS_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    CREATE_MENU_ITEM_FAILURE,
    UPDATE_MENU_ITEM_REQUEST,
    UPDATE_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEMS_REQUEST,
    SEARCH_MENU_ITEMS_SUCCESS,
    SEARCH_MENU_ITEMS_FAILURE,
    CLEAR_SEARCH_RESULTS,
    UPDATE_ITEM_AVAILABILITY_REQUEST,
    UPDATE_ITEM_AVAILABILITY_SUCCESS,
    UPDATE_ITEM_AVAILABILITY_FAILURE
} from './action-types';

// Fetch menu items
export const fetchMenuItems = (restaurantId) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_MENU_ITEMS_REQUEST });
        const response = await api.get(`/api/food/restaurant/${restaurantId}`);
        dispatch({
            type: FETCH_MENU_ITEMS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_MENU_ITEMS_FAILURE,
            payload: error.response?.data?.message || 'Failed to fetch menu items'
        });
        throw error;
    }
};

// Create menu item
export const createMenuItem = (menuItemData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        const response = await api.post('/api/admin/food/create', menuItemData);
        dispatch({
            type: CREATE_MENU_ITEM_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CREATE_MENU_ITEM_FAILURE,
            payload: error.response?.data?.message || 'Failed to create menu item'
        });
        throw error;
    }
};

// Update menu item
export const updateMenuItem = (itemId, menuItemData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MENU_ITEM_REQUEST });
        const response = await api.put(`/api/admin/food/${itemId}`, menuItemData);
        dispatch({
            type: UPDATE_MENU_ITEM_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_MENU_ITEM_FAILURE,
            payload: error.response?.data?.message || 'Failed to update menu item'
        });
        throw error;
    }
};

// Delete menu item
export const deleteMenuItem = (itemId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        await api.delete(`/api/admin/food/${itemId}`);
        dispatch({
            type: DELETE_MENU_ITEM_SUCCESS,
            payload: itemId
        });
    } catch (error) {
        dispatch({
            type: DELETE_MENU_ITEM_FAILURE,
            payload: error.response?.data?.message || 'Failed to delete menu item'
        });
        throw error;
    }
};

// Search menu items
export const searchMenuItems = (searchTerm) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_MENU_ITEMS_REQUEST });
        const response = await api.get(`/api/food/search?q=${searchTerm}`);
        dispatch({
            type: SEARCH_MENU_ITEMS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: SEARCH_MENU_ITEMS_FAILURE,
            payload: error.response?.data?.message || 'Failed to search menu items'
        });
        throw error;
    }
};

// Clear search results
export const clearSearchResults = () => (dispatch) => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
};


export const updateItemAvailability = (id, isAvailable) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ITEM_AVAILABILITY_REQUEST });
        const response = await api.put(`/api/admin/food/status/${id}`, { isAvailable });
        dispatch({
            type: UPDATE_ITEM_AVAILABILITY_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ITEM_AVAILABILITY_FAILURE,
            payload: error.response?.data?.message || 'Failed to update item availability'
        });
        throw error;
    }
};
