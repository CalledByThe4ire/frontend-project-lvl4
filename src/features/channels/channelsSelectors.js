import { createSelector } from '@reduxjs/toolkit';

const channelsSelector = (state) => state.channelsInfo.channels;

const currentChannelIdSelector = (state) => state.channelsInfo.currentChannelId;

const channelsNamesSelector = createSelector(channelsSelector, (channels) =>
  // eslint-disable-next-line
  channels.map((channel) => channel.name));

const currentChannelSelector = createSelector(
  channelsSelector,
  currentChannelIdSelector,
  (channels, id) => channels.find((channel) => channel.id === id),
);

export {
  channelsSelector,
  currentChannelIdSelector,
  channelsNamesSelector,
  currentChannelSelector,
};
