import { combineReducers } from 'redux';
import channelsReducer from './modules/channels/reducer';
import messagesReducer from './modules/messages/reducer';
import modalReducer from './modules/modal/reducer';

import { channelsTypes, channelsActions } from './modules/channels';
import { messagesTypes, messagesActions } from './modules/messages';
import { modalTypes, modalActions } from './modules/modal';

export {
  channelsTypes,
  channelsActions,
  messagesTypes,
  messagesActions,
  modalTypes,
  modalActions,
};

export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
});
