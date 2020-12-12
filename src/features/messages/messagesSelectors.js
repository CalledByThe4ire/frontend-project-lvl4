/* eslint-disable import/prefer-default-export */

import { createSelector } from '@reduxjs/toolkit';
import { currentChannelIdSelector } from '../channels/channelsSelectors';

const messagesSelector = (state) => state.messagesInfo.messages;

const currentChannelMessagesSelector = createSelector(
  messagesSelector,
  currentChannelIdSelector,
  (items, id) => items.filter((item) => item.channelId === id),
);

export { currentChannelMessagesSelector };
