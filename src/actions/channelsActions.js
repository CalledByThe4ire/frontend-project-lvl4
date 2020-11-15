import {
  GET_CHANNELS,
  ADD_CHANNEL,
  RENAME_CHANNEL,
  REMOVE_CHANNEL,
  SET_CURRENT_CHANNEL_ID,
} from './types';

export const setCurrentChannelId = (payload) => ({
  type: SET_CURRENT_CHANNEL_ID,
  payload,
});
export const getChannels = () => ({ type: GET_CHANNELS });
export const addChannel = () => ({ type: ADD_CHANNEL });
export const renameChannel = () => ({ type: RENAME_CHANNEL });
export const removeChannel = () => ({ type: REMOVE_CHANNEL });
