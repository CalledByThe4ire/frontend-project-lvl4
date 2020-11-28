import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import modalReducer from '../features/modal/modalSlice';

export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
});
