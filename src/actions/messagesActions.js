import axios from 'axios';
import {
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILURE,
  REMOVE_CHANNEL_MESSAGES,
} from './types';
import routes from '../routes';

const addMessageRequest = () => ({ type: ADD_MESSAGE_REQUEST });

export const addMessageSuccess = (payload) => ({
  type: ADD_MESSAGE_SUCCESS,
  payload,
});

export const addMessageFailure = (payload) => ({
  type: ADD_MESSAGE_FAILURE,
  payload,
});

export const removeChannelMessages = (payload) => ({
  type: REMOVE_CHANNEL_MESSAGES,
  payload,
});

export const addMessage = (id, message) => async (dispatch) => {
  dispatch(addMessageRequest());

  try {
    const data = {
      data: { attributes: { message } },
    };

    await axios.post(`${routes.channelMessagesPath(id)}`, data);
  } catch (error) {
    console.error(error);
    dispatch(addMessageFailure(error));
  }
};
