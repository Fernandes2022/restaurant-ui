import { api } from '../../api';
import {
    FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    CALCULATE_CART_TOTAL_REQUEST,
    CALCULATE_CART_TOTAL_SUCCESS,
    CALCULATE_CART_TOTAL_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    SET_DELIVERY_TYPE_REQUEST,
    SET_DELIVERY_TYPE_SUCCESS,
    SET_DELIVERY_TYPE_FAILURE
} from './action-types';

// Fetch user's cart
export const fetchCart = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CART_REQUEST });
        const response = await api.get('/api/cart');
        dispatch({
            type: FETCH_CART_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CART_FAILURE,
            payload: error.response?.data?.message || 'Failed to fetch cart'
        });
        throw error;
    }
};

// Add item to cart
export const addToCart = (cartItemData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });
        const response = await api.put('/api/cart/add', cartItemData);
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: error.response?.data?.message || 'Failed to add item to cart'
        });
        throw error;
    }
};

// Clear cart
export const clearCart = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_CART_REQUEST });
        await api.put('/api/cart/clear', {});
        const refreshedCart = await api.get('/api/cart');
        dispatch({
            type: CLEAR_CART_SUCCESS,
            payload: refreshedCart.data
        });
    } catch (error) {
        dispatch({
            type: CLEAR_CART_FAILURE,
            payload: error.response?.data?.message || 'Failed to clear cart'
        });
        throw error;
    }
};

// Calculate cart total
export const calculateCartTotal = () => async (dispatch) => {
    try {
        dispatch({ type: CALCULATE_CART_TOTAL_REQUEST });
        const response = await api.get('/api/cart/total');
        dispatch({
            type: CALCULATE_CART_TOTAL_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CALCULATE_CART_TOTAL_FAILURE,
            payload: error.response?.data?.message || 'Failed to calculate cart total'
        });
        throw error;
    }
};

// Update cart item quantity
export const updateCartItemQuantity = (cartItemData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST });
        await api.put('/api/cart-item/update', cartItemData);
        const refreshedCart = await api.get('/api/cart');
        dispatch({
            type: UPDATE_CART_ITEM_SUCCESS,
            payload: refreshedCart.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CART_ITEM_FAILURE,
            payload: error.response?.data?.message || 'Failed to update cart item'
        });
        throw error;
    }
};

// Remove item from cart
export const removeCartItem = (itemId) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST });
        await api.delete(`/api/cart-item/${itemId}/remove`);
        const refreshedCart = await api.get('/api/cart');
        dispatch({
            type: REMOVE_CART_ITEM_SUCCESS,
            payload: refreshedCart.data
        });
    } catch (error) {
        dispatch({
            type: REMOVE_CART_ITEM_FAILURE,
            payload: error.response?.data?.message || 'Failed to remove cart item'
        });
        throw error;
    }
}; 

export const setDeliveryType = (deliveryType) => async (dispatch) => {
    try {
        dispatch({ type: SET_DELIVERY_TYPE_REQUEST });
        await api.put('/api/cart/delivery-type', { type: deliveryType });
        const refreshedCart = await api.get('/api/cart');
        dispatch({
            type: SET_DELIVERY_TYPE_SUCCESS,
            payload: refreshedCart.data
        });
    } catch (error) {
                dispatch({
            type: SET_DELIVERY_TYPE_FAILURE,
            payload: error.response?.data?.message || 'Failed to set delivery type'
        });
    }
}