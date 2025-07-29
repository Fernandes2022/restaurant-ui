import { api } from '../../api';
import {
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAILURE,
    FETCH_RESTAURANT_REQUEST,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_FAILURE,
    FETCH_MY_RESTAURANT_REQUEST,
    FETCH_MY_RESTAURANT_SUCCESS,
    FETCH_MY_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    SEARCH_RESTAURANTS_REQUEST,
    SEARCH_RESTAURANTS_SUCCESS,
    SEARCH_RESTAURANTS_FAILURE,
    ADD_TO_FAVOURITE_REQUEST,
    ADD_TO_FAVOURITE_SUCCESS,
    ADD_TO_FAVOURITE_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_RATING_REQUEST,
    UPDATE_RESTAURANT_RATING_SUCCESS,
    UPDATE_RESTAURANT_RATING_FAILURE,
    FETCH_RESTAURANT_ORDERS_REQUEST,
    FETCH_RESTAURANT_ORDERS_SUCCESS,
    FETCH_RESTAURANT_ORDERS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
} from './action-types';

// Public actions (no auth required)
export const fetchRestaurants = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_RESTAURANTS_REQUEST });
        const response = await api.get('/api/restaurants');
        dispatch({ 
            type: FETCH_RESTAURANTS_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_RESTAURANTS_FAILURE, 
            payload: error.response?.data?.message || 'Failed to fetch restaurants' 
        });
        throw error;
    }
};

export const fetchRestaurant = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_RESTAURANT_REQUEST });
        const response = await api.get(`/api/restaurants/${id}`);
        dispatch({ 
            type: FETCH_RESTAURANT_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_RESTAURANT_FAILURE, 
            payload: error.response?.data?.message || 'Failed to fetch restaurant' 
        });
        throw error;
    }
};

export const searchRestaurants = (searchTerm) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_RESTAURANTS_REQUEST });
        const response = await api.get(`/api/restaurants/search?q=${searchTerm}`);
        dispatch({ 
            type: SEARCH_RESTAURANTS_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: SEARCH_RESTAURANTS_FAILURE, 
            payload: error.response?.data?.message || 'Failed to search restaurants' 
        });
        throw error;
    }
};

// Protected actions (auth required)
export const fetchMyRestaurant = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_MY_RESTAURANT_REQUEST });
        const response = await api.get('/api/restaurants/myrestaurant');
        dispatch({ 
            type: FETCH_MY_RESTAURANT_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_MY_RESTAURANT_FAILURE, 
            payload: error.response?.data?.message || 'Failed to fetch your restaurant' 
        });
        throw error;
    }
};

export const createRestaurant = (restaurantData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        const response = await api.post('/api/restaurants', restaurantData);
        dispatch({ 
            type: CREATE_RESTAURANT_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: CREATE_RESTAURANT_FAILURE, 
            payload: error.response?.data?.message || 'Failed to create restaurant' 
        });
        throw error;
    }
};

export const updateRestaurant = (id, restaurantData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        const response = await api.put(`/api/restaurants/${id}`, restaurantData);
        dispatch({ 
            type: UPDATE_RESTAURANT_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: UPDATE_RESTAURANT_FAILURE, 
            payload: error.response?.data?.message || 'Failed to update restaurant' 
        });
        throw error;
    }
};

export const deleteRestaurant = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        await api.delete(`/api/restaurants/${id}`);
        dispatch({ 
            type: DELETE_RESTAURANT_SUCCESS, 
            payload: id
        });
    } catch (error) {
        dispatch({ 
            type: DELETE_RESTAURANT_FAILURE, 
            payload: error.response?.data?.message || 'Failed to delete restaurant' 
        });
        throw error;
    }
};

export const addToFavourite = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_FAVOURITE_REQUEST });
        const response = await api.post(`/api/restaurants/favourite/${id}`, {});
        dispatch({ 
            type: ADD_TO_FAVOURITE_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: ADD_TO_FAVOURITE_FAILURE, 
            payload: error.response?.data?.message || 'Failed to add to favourites' 
        });
        throw error;
    }
};

export const updateRestaurantStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        const response = await api.patch(`/api/restaurants/${id}/status`, {});
        dispatch({ 
            type: UPDATE_RESTAURANT_STATUS_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: UPDATE_RESTAURANT_STATUS_FAILURE, 
            payload: error.response?.data?.message || 'Failed to update restaurant status' 
        });
        throw error;
    }
};

export const updateRestaurantRating = (id, rating) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESTAURANT_RATING_REQUEST });
        const response = await api.post(`/api/restaurants/rate/${id}`, { rating });
        dispatch({ 
            type: UPDATE_RESTAURANT_RATING_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: UPDATE_RESTAURANT_RATING_FAILURE, 
            payload: error.response?.data?.message || 'Failed to update restaurant rating' 
        });
        throw error;
    }
};

export const fetchRestaurantOrders = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_RESTAURANT_ORDERS_REQUEST });
        const response = await api.get('/api/admin/order/restaurant');
        dispatch({ 
            type: FETCH_RESTAURANT_ORDERS_SUCCESS, 
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_RESTAURANT_ORDERS_FAILURE, 
            payload: error.response?.data?.message || 'Failed to fetch restaurant orders' 
        });
        throw error;
    }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        await api.patch(`/api/admin/order/${orderId}/status`, { status });
        const refreshedOrders = await api.get('/api/admin/order/restaurant');
        dispatch({ 
            type: UPDATE_ORDER_STATUS_SUCCESS, 
            payload: refreshedOrders.data
        });
    } catch (error) {
        dispatch({ 
            type: UPDATE_ORDER_STATUS_FAILURE, 
            payload: error.response?.data?.message || 'Failed to update order status' 
        });
        throw error;
    }
}; 