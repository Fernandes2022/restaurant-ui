import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE
} from './action-types';
import { api } from '../../api';

// Fetch events for a restaurant
export const fetchEvents = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EVENTS_REQUEST });
    const response = await api.get(`/api/admin/events/restaurant/${restaurantId}`);
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_EVENTS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch events'
    });
    throw error;
  }
};

// Create new event
export const createEvent = (restaurantId, eventData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EVENT_REQUEST });
    const response = await api.post(`/api/admin/events/restaurant/${restaurantId}`, eventData);
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAILURE,
      payload: error.response?.data?.message || 'Failed to create event'
    });
    throw error;
  }
};

// Delete event
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });
    await api.delete(`/api/admin/events/${eventId}`);
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: eventId
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAILURE,
      payload: error.response?.data?.message || 'Failed to delete event'
    });
    throw error;
  }
}; 