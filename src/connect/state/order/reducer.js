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

const initialState = {
    orders: [],
    restaurantOrders: [],
    loading: false,
    error: null,
    success: false,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // Create Order
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, action.payload],
                success: true,
            };
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        // Get User Orders
        case GET_USER_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case GET_USER_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Get Restaurant Orders
        case GET_RESTAURANT_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_RESTAURANT_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantOrders: action.payload,
            };
        case GET_RESTAURANT_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Update Order Status
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
         case UPDATE_ORDER_STATUS_SUCCESS:
    return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
            order._id === action.payload._id ? action.payload : order
        ),
        restaurantOrders: state.restaurantOrders.map((order) =>
            order._id === action.payload._id ? action.payload : order
        ),
    };

        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Cancel Order
        case CANCEL_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter((order) => order._id !== action.payload),
                restaurantOrders: state.restaurantOrders.filter(
                    (order) => order._id !== action.payload
                ),
            };
        case CANCEL_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default orderReducer; 