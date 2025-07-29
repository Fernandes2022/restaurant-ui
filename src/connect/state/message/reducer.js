import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from './action-types';

const initialState = {
  messages: [],
  loading: false,
  error: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
        error: null
      };

    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default messageReducer; 