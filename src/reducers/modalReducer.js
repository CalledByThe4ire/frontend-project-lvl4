import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
  isOpened: false,
  type: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpened: true,
        type: action.payload,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isOpened: false,
        type: null,
      };

    default:
      break;
  }

  return state;
};

export default modalReducer;
