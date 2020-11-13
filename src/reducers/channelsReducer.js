import gon from 'gon';

const initialState = {
  channels: gon.channels || [],
  currentChannelId: gon.currentChannelId || null,
};

const channelsReducer = (state, action) => {
  switch (action.type) {
    default:
      return initialState;
  }
};

export default channelsReducer;
