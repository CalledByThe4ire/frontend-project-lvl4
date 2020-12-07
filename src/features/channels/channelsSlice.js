/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    renameChannel(state, action) {
      const channel = state.channels.find((c) => c.id === action.payload.id);
      channel.name = action.payload.name;
    },
    removeChannel(state, action) {
      state.channels = state.channels.filter((c) => c.id !== action.payload.id);
      state.currentChannelId = state.channels.find(
        (channel) => !channel.removable,
      ).id;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload.id;
    },
  },
});

export const {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
