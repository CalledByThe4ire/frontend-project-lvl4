const { ROLLBAR_POST_CLIENT_ITEM } = process.env;

const rollbarConfig = {
  accessToken: ROLLBAR_POST_CLIENT_ITEM,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

export default rollbarConfig;
