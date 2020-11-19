import axios from 'axios';
import {
  ADD_CHANNEL_REQUEST,
  ADD_CHANNEL_SUCCESS,
  ADD_CHANNEL_FAILURE,
  RENAME_CHANNEL_REQUEST,
  RENAME_CHANNEL_SUCCESS,
  RENAME_CHANNEL_FAILURE,
  REMOVE_CHANNEL_REQUEST,
  REMOVE_CHANNEL_SUCCESS,
  REMOVE_CHANNEL_FAILURE,
  SET_CURRENT_CHANNEL_ID,
} from './types';
import routes from '../routes';

const addChannelRequest = () => ({ type: ADD_CHANNEL_REQUEST });

export const addChannelSuccess = (payload) => ({
  type: ADD_CHANNEL_SUCCESS,
  payload,
});

const addChannelFailure = (payload) => {
  console.error(payload);
  return {
    type: ADD_CHANNEL_FAILURE,
    payload,
  };
};

const renameChannelRequest = () => ({ type: RENAME_CHANNEL_REQUEST });

const renameChannelFailure = (payload) => {
  console.error(payload);
  return {
    type: RENAME_CHANNEL_FAILURE,
    payload,
  };
};

export const renameChannelSuccess = (payload) => ({
  type: RENAME_CHANNEL_SUCCESS,
  payload,
});

const removeChannelRequest = () => ({ type: REMOVE_CHANNEL_REQUEST });

export const removeChannelSuccess = (payload) => ({
  type: REMOVE_CHANNEL_SUCCESS,
  payload,
});

const removeChannelFailure = (payload) => {
  console.error(payload);
  return {
    type: REMOVE_CHANNEL_FAILURE,
    payload,
  };
};

export const addChannel = (name) => async (dispatch) => {
  dispatch(addChannelRequest());

  try {
    const data = {
      data: { attributes: { name } },
    };

    await axios.post(`${routes.channelsPath()}`, data);
  } catch (error) {
    console.error(error);
    dispatch(addChannelFailure(error));
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  dispatch(renameChannelRequest());

  try {
    const data = {
      data: { attributes: { name } },
    };

    await axios.patch(`${routes.channelPath(id)}`, data);
  } catch (error) {
    console.error(error);
    dispatch(renameChannelFailure(error));
  }
};

export const removeChannel = (id) => async (dispatch) => {
  dispatch(removeChannelRequest());

  try {
    const data = {
      data: { id },
    };

    await axios.delete(`${routes.channelPath(id)}`, data);
  } catch (error) {
    console.error(error);
    dispatch(removeChannelFailure(error));
  }
};

export const setCurrentChannelId = (payload) => ({
  type: SET_CURRENT_CHANNEL_ID,
  payload,
});
