import { api } from '../../api';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILURE,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
} from './action-types';

// Create Order
export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        await api.post('/api/order', orderData);
        const refreshedCart = await api.get('/api/cart');
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: refreshedCart.data
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response?.data?.message || 'Failed to create order'
        });
        throw error;
    }
};

// Get User Orders
export const getUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_ORDERS_REQUEST });
        const response = await api.get('/api/order/user');
        dispatch({
            type: GET_USER_ORDERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_USER_ORDERS_FAILURE,
            payload: error.response?.data?.message || 'Failed to fetch user orders'
        });
        throw error;
    }
};

// Get Restaurant Orders (Admin)
export const getRestaurantOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
        const response = await api.get(`/api/admin/order/restaurant`);
        dispatch({
            type: GET_RESTAURANT_ORDERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_RESTAURANT_ORDERS_FAILURE,
            payload: error.response?.data?.message || 'Failed to fetch restaurant orders'
        });
        throw error;
    }
};

// Update Order Status (Admin)
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        await api.patch(`/api/admin/order/${orderId}/status`, { status });
        const refreshedOrders = await api.get(`/api/admin/order/restaurant`);
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

// Cancel Order
export const cancelOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });
        await api.delete(`/api/admin/order/${orderId}`);
        const refreshedOrders = await api.get('/api/order/user');
        dispatch({
            type: CANCEL_ORDER_SUCCESS,
            payload: refreshedOrders.data
        });
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAILURE,
            payload: error.response?.data?.message || 'Failed to cancel order'
        });
        throw error;
    }
}; 