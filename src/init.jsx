// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import faker from 'faker';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import Rollbar from 'rollbar';
import rollbarMiddleware from 'rollbar-redux-middleware';
import UserContext from './context/UserContext.jsx';
import App from './components/App.jsx';
import rootReducer from './reducers';
import rollbarConfig from '../config/rollbar';
import { LoadingStatus } from './const';

export default ({ channels, currentChannelId }) => {
  const rollbarRedux = rollbarMiddleware(new Rollbar(rollbarConfig));

  const middlewares = [...getDefaultMiddleware(), rollbarRedux];

  const preloadedState = {
    channelsInfo: {
      channels,
      currentChannelId,
      loadingStatus: LoadingStatus.IDLE,
      currentRequestId: undefined,
      error: null,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    middlewares,
    preloadedState,
  });

  const username = faker.name.findName();
  cookies.set('username', username);

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={cookies.get('username')}>
        <App socket={io()} />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('app'),
  );
};
