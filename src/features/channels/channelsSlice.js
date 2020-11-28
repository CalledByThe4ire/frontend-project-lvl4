/* eslint-disable no-param-reassign, consistent-return */

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../../routes';
import { LoadingStatus } from '../../const';

const initialState = {
  channels: [],
  currentChannelId: null,
  loadingStatus: LoadingStatus.IDLE,
  currentRequestId: undefined,
  error: null,
};

export const addChannelRequest = createAsyncThunk(
  'channels/addChannelRequestStatus',
  async ({ name }, { getState, requestId }) => {
    const { currentRequestId, loadingStatus } = getState().channelsInfo;

    if (
      loadingStatus !== LoadingStatus.PENDING
      || requestId !== currentRequestId
    ) {
      return;
    }

    const response = await axios.post(`${routes.channelsPath()}`, {
      data: { attributes: { name } },
    });

    return response.data;
  },
);

export const renameChannelRequest = createAsyncThunk(
  'channels/renameChannelRequestStatus',
  async ({ id, name }, { getState, requestId }) => {
    const { currentRequestId, loadingStatus } = getState().channelsInfo;

    if (
      loadingStatus !== LoadingStatus.PENDING
      || requestId !== currentRequestId
    ) {
      return;
    }

    const response = await axios.patch(`${routes.channelPath(id)}`, {
      data: { attributes: { name } },
    });

    return response.data;
  },
);

export const removeChannelRequest = createAsyncThunk(
  'channels/removeChannelRequestStatus',
  async ({ id }, { getState, requestId }) => {
    const { currentRequestId, loadingStatus } = getState().channelsInfo;

    if (
      loadingStatus !== LoadingStatus.PENDING
      || requestId !== currentRequestId
    ) {
      return;
    }

    const response = await axios.delete(`${routes.channelPath(id)}`, {
      data: { id },
    });

    return response.data;
  },
);

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
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload.id;
    },
  },
  extraReducers: [
    addChannelRequest,
    renameChannelRequest,
    removeChannelRequest,
  ].reduce(
    (acc, channelRequest) => ({
      ...acc,
      [channelRequest.pending]: (state, action) => {
        if (state.loadingStatus === LoadingStatus.IDLE) {
          state.loadingStatus = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
        }
      },
      [channelRequest.fulfilled]: (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === LoadingStatus.PENDING
          && state.currentRequestId === requestId
        ) {
          state.loadingStatus = LoadingStatus.IDLE;
          state.currentRequestId = undefined;
        }
      },
      [channelRequest.rejected]: (state, action) => {
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
    }),
    {},
  ),
});

export const {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
