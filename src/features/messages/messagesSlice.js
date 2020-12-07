/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from '../channels/channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    removeMessagesByChannelId(state, action) {
      state.messages = state.messages.filter(
        (message) => message.channelId !== action.payload.id,
      );
    },
  },
  extraReducers: {
    [removeChannel.type]: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.channelId !== action.payload.id,
      );
    },
  },
});

export const { addMessage, removeMessagesByChannelId } = messagesSlice.actions;

export default messagesSlice.reducer;
