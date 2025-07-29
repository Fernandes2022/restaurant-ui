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

const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
    case ADD_INGREDIENT_REQUEST:
    case UPDATE_INGREDIENT_REQUEST:
    case DELETE_INGREDIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
        error: null
      };
    case ADD_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: [...state.ingredients, action.payload],
        error: null
      };
    case UPDATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: state.ingredients.map(ingredient =>
          ingredient._id === action.payload._id ? action.payload : ingredient
        ),
        error: null
      };
    case DELETE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: state.ingredients.filter(ingredient => ingredient._id !== action.payload),
        error: null
      };
    case FETCH_INGREDIENTS_FAILURE:
    case ADD_INGREDIENT_FAILURE:
    case UPDATE_INGREDIENT_FAILURE:
    case DELETE_INGREDIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ingredientReducer; 