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

const initialState = {
    restaurants: [],
    restaurant: null,
    myRestaurant: null,
    orders: [],
    loading: false,
    error: null,
    searchResults: [],
    searchLoading: false,
    searchError: null,
    ordersLoading: false,
    ordersError: null
};

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch all restaurants
        case FETCH_RESTAURANTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
                error: null
            };
        case FETCH_RESTAURANTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Fetch single restaurant
        case FETCH_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
                error: null
            };
        case FETCH_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Fetch my restaurant
        case FETCH_MY_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_MY_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                myRestaurant: action.payload,
                error: null
            };
        case FETCH_MY_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Create restaurant
        case CREATE_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                myRestaurant: action.payload,
                error: null
            };
        case CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Update restaurant
        case UPDATE_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
                myRestaurant: state.myRestaurant?._id === action.payload._id ? action.payload : state.myRestaurant,
                error: null
            };
        case UPDATE_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Delete restaurant
        case DELETE_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                myRestaurant: null,
                error: null
            };
        case DELETE_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Search restaurants
        case SEARCH_RESTAURANTS_REQUEST:
            return {
                ...state,
                searchLoading: true,
                searchError: null
            };
        case SEARCH_RESTAURANTS_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchResults: action.payload,
                searchError: null
            };
        case SEARCH_RESTAURANTS_FAILURE:
            return {
                ...state,
                searchLoading: false,
                searchError: action.payload
            };

        // Add to favourites
        case ADD_TO_FAVOURITE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_TO_FAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_TO_FAVOURITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Update restaurant status
        case UPDATE_RESTAURANT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_RESTAURANT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
                myRestaurant: state.myRestaurant?._id === action.payload._id ? action.payload : state.myRestaurant,
                error: null
            };
        case UPDATE_RESTAURANT_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Update restaurant rating
        case UPDATE_RESTAURANT_RATING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_RESTAURANT_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
                error: null
            };
        case UPDATE_RESTAURANT_RATING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Fetch restaurant orders
        case FETCH_RESTAURANT_ORDERS_REQUEST:
            return {
                ...state,
                ordersLoading: true,
                ordersError: null
            };
        case FETCH_RESTAURANT_ORDERS_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orders: action.payload,
                ordersError: null
            };
        case FETCH_RESTAURANT_ORDERS_FAILURE:
            return {
                ...state,
                ordersLoading: false,
                ordersError: action.payload
            };

        // Update order status
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                ordersLoading: true,
                ordersError: null
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orders: state.orders.map(order => 
                    order._id === action.payload._id ? action.payload : order
                ),
                ordersError: null
            };
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                ordersLoading: false,
                ordersError: action.payload
            };

        default:
            return state;
    }
};

export default restaurantReducer; 