import {
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILURE,
  REMOVE_CHANNEL_MESSAGES,
} from './types';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE_REQUEST:
      return { ...state, isLoading: true };

    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        messages: [...state.messages, action.payload],
      };

    case ADD_MESSAGE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case REMOVE_CHANNEL_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.channelId !== action.payload.id,
        ),
      };
    default:
      break;
  }

  return state;
};

export default messagesReducer;
