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

const initialState = {
    cart: null, // Will hold the full cart object from backend
    loading: false,
    error: null
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Cart
        case FETCH_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload || null
            };
        case FETCH_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Add to Cart
        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload || state.cart
            };
        case ADD_TO_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Clear Cart
        case CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload || null
            };
        case CLEAR_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Calculate Cart Total
        case CALCULATE_CART_TOTAL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CALCULATE_CART_TOTAL_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: {
                    ...state.cart,
                    ...action.payload // Assume payload contains updated total fields
                }
            };
        case CALCULATE_CART_TOTAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Update Cart Item
        case UPDATE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload || state.cart
            };
        case UPDATE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Remove Cart Item
        case REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload || state.cart
            };
        case REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Set Delivery Type
        case SET_DELIVERY_TYPE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SET_DELIVERY_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload || state.cart
            };
        case SET_DELIVERY_TYPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default cartReducer; 