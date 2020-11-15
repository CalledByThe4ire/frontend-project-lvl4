/* eslint-disable no-param-reassign */

import gon from 'gon';

const initialState = {
  channels: gon.channels || [],
  currentChannelId: gon.currentChannelId || null,
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      break;
  }

  return state;
};

export default channelsReducer;
