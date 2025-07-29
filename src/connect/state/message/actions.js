import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from './action-types';
import { api } from '../../api';


// Send message
export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });
  try {
    const response = await api.post('/api/contact', messageData);
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAILURE,
      payload: error.message
    });
  }
}; 