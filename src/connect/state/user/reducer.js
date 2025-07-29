import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE
} from './action-types';

const initialState = {
  profile: null,
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null
      };

    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer; 