import {
  SET_CURRENT_CHANNEL_ID,
} from './types';

export const setCurrentChannelId = (payload) => ({
  type: SET_CURRENT_CHANNEL_ID,
  payload,
});
