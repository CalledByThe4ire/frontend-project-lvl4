/* eslint-disable no-param-reassign, consistent-return */

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../../routes';
import { LoadingStatus } from '../../const';

const initialState = {
  messages: [],
  loadingStatus: LoadingStatus.IDLE,
  currentRequestId: undefined,
  error: null,
};

export const addMessageRequest = createAsyncThunk(
  'messages/addMessageRequestStatus',
  async ({ id, message }, { getState, requestId }) => {
    const { currentRequestId, loadingStatus } = getState().messagesInfo;

    if (
      loadingStatus !== LoadingStatus.PENDING
      || requestId !== currentRequestId
    ) {
      return;
    }

    const response = await axios.post(`${routes.channelMessagesPath(id)}`, {
      data: { attributes: { message } },
    });

    return response.data;
  },
);

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
    [addMessageRequest.pending]: (state, action) => {
      if (state.loadingStatus === LoadingStatus.IDLE) {
        state.loadingStatus = LoadingStatus.PENDING;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [addMessageRequest.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (
        state.loadingStatus === LoadingStatus.PENDING
        && state.currentRequestId === requestId
      ) {
        state.loadingStatus = LoadingStatus.IDLE;
        state.currentRequestId = undefined;
      }
    },
    [addMessageRequest.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (
        state.loadingStatus === LoadingStatus.PENDING
        && state.currentRequestId === requestId
      ) {
        state.loadingStatus = LoadingStatus.IDLE;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addMessage, removeMessagesByChannelId } = messagesSlice.actions;

export default messagesSlice.reducer;
