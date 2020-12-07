/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpened = true;
      state.type = action.payload.type;
      state.extra = action.payload.id || initialState.extra;
    },
    closeModal(state) {
      state.isOpened = initialState.isOpened;
      state.type = initialState.type;
      state.extra = initialState.extra;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
