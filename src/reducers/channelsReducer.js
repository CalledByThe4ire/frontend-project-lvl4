/* eslint-disable no-param-reassign */

import gon from 'gon';
import {
  ADD_CHANNEL_REQUEST,
  ADD_CHANNEL_SUCCESS,
  ADD_CHANNEL_FAILURE,
  RENAME_CHANNEL_REQUEST,
  RENAME_CHANNEL_SUCCESS,
  RENAME_CHANNEL_FAILURE,
  SET_CURRENT_CHANNEL_ID,
} from '../actions/types';

const initialState = {
  channels: gon.channels || [],
  currentChannelId: gon.currentChannelId || null,
  isLoading: false,
  error: null,
};

const updateChannel = (channels, id, name) => {
  const channelIndex = channels.findIndex((c) => c.id === id);

  const channel = channels[channelIndex];

  channel.name = name;

  return [
    ...channels.slice(0, channelIndex),
    channel,
    ...channels.slice(channelIndex + 1),
  ];
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL_REQUEST:
    case RENAME_CHANNEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_CHANNEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        channels: [...state.channels, action.payload],
      };

    case RENAME_CHANNEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        channels: updateChannel(
          state.channels,
          action.payload.id,
          action.payload.name,
        ),
      };

    case ADD_CHANNEL_FAILURE:
    case RENAME_CHANNEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SET_CURRENT_CHANNEL_ID:
      return { ...state, currentChannelId: action.payload };
    default:
      break;
  }

  return state;
};

export default channelsReducer;
