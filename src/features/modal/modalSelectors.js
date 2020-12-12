const modalExtraSelector = (state) => state.modal.extra;

const modalTypeSelector = (state) => state.modal.type;

const isModalOpenedSelector = (state) => state.modal.isOpened;

export { modalExtraSelector, modalTypeSelector, isModalOpenedSelector };
