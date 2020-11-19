import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpened: true,
        type: action.payload.type,
        extra: action.payload.id || state.extra,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isOpened: false,
        type: null,
        extra: null,
      };

    default:
      break;
  }

  return state;
};

export default modalReducer;
