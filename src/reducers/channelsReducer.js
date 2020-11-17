/* eslint-disable no-param-reassign */

import gon from 'gon';
import {
  ADD_CHANNEL_REQUEST,
  ADD_CHANNEL_SUCCESS,
  ADD_CHANNEL_FAILURE,
  SET_CURRENT_CHANNEL_ID,
} from '../actions/types';

const initialState = {
  channels: gon.channels || [],
  currentChannelId: gon.currentChannelId || null,
  isLoading: false,
  error: null,
  modal: {
    isOpened: false,
    type: null,
    extra: null,
  },
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL_REQUEST:
      return { ...state, isLoading: true };

    case ADD_CHANNEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        channels: [...state.channels, action.payload],
      };

    case ADD_CHANNEL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case SET_CURRENT_CHANNEL_ID:
      return { ...state, currentChannelId: action.payload };
    default:
      break;
  }

  return state;
};

export default channelsReducer;
