import { combineReducers } from 'redux';
import channelsReducer from './channelsReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
});
