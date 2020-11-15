/* eslint-disable no-param-reassign */

import gon from 'gon';
import { SET_CURRENT_CHANNEL_ID } from '../actions/types';

const initialState = {
  channels: gon.channels || [],
  currentChannelId: gon.currentChannelId || null,
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL_ID:
      return { ...state, currentChannelId: action.payload };
    default:
      break;
  }

  return state;
};

export default channelsReducer;
