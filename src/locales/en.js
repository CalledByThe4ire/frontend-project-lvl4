export default {
  translation: {
    channelNameValidationStatus: {
      failure: {
        errors: {
          required: 'Required',
          alphanumeric: 'Only alphanumeric allowed',
          unique: 'Must be unique',
          minCharacters(quantity) {
            return `Must be at least ${quantity} characters`;
          },
        },
      },
    },
    requestStatus: {
      failure: 'Something went wrong… Please, try again later',
    },
  },
};
