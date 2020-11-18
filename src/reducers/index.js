import { combineReducers } from 'redux';
import channelsReducer from './channelsReducer';
import messagesReducer from './messagesReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
});
