import {
    FETCH_MENU_REQUEST,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE,
    ADD_MENU_ITEM_REQUEST,
    ADD_MENU_ITEM_SUCCESS,
    ADD_MENU_ITEM_FAILURE,
    UPDATE_MENU_ITEM_REQUEST,
    UPDATE_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    SET_CURRENT_MENU_ITEM,
    CLEAR_CURRENT_MENU_ITEM,
    SEARCH_MENU_ITEMS_REQUEST,
    SEARCH_MENU_ITEMS_SUCCESS,
    SEARCH_MENU_ITEMS_FAILURE,
    CLEAR_SEARCH_RESULTS
} from './action-types';

const initialState = {
    menuItems: [],
    searchResults: [],
    currentMenuItem: null,
    loading: false,
    error: null
};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MENU_REQUEST:
        case ADD_MENU_ITEM_REQUEST:
        case UPDATE_MENU_ITEM_REQUEST:
        case DELETE_MENU_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case SEARCH_MENU_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
                error: null
            };

        case ADD_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                error: null
            };

        case UPDATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                error: null
            };

        case DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(item => item._id !== action.payload),
                error: null
            };

        case SEARCH_MENU_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                searchResults: action.payload,
                error: null
            };

        case FETCH_MENU_FAILURE:
        case ADD_MENU_ITEM_FAILURE:
        case UPDATE_MENU_ITEM_FAILURE:
        case DELETE_MENU_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case SEARCH_MENU_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: []
            };

        case SET_CURRENT_MENU_ITEM:
            return {
                ...state,
                currentMenuItem: action.payload
            };

        case CLEAR_CURRENT_MENU_ITEM:
            return {
                ...state,
                currentMenuItem: null
            };

        default:
            return state;
    }
};

export default menuReducer; 