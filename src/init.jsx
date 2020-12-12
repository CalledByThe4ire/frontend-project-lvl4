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
import {
  addChannel,
  renameChannel,
  removeChannel,
} from './features/channels/channelsSlice';
import { addMessage } from './features/messages/messagesSlice';
import UserContext from './context/UserContext.jsx';
import App from './components/App.jsx';
import rootReducer from './reducers';
import rollbarConfig from '../config/rollbar';

export default async ({ channels, currentChannelId }) => {
  const rollbarRedux = rollbarMiddleware(new Rollbar(rollbarConfig));

  const middlewares = [...getDefaultMiddleware(), rollbarRedux];

  const preloadedState = {
    channelsInfo: {
      channels,
      currentChannelId,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    middlewares,
    preloadedState,
  });

  const setUsername = () => {
    const username = faker.name.findName();
    cookies.set('username', username);
  };

  const getUsername = () => cookies.get('username');

  if (!getUsername()) {
    setUsername();
  }

  const username = getUsername();

  const socket = io();

  socket.on('newMessage', (msg) => {
    const {
      data: {
        attributes: { message: body, id, channelId },
      },
    } = msg;

    store.dispatch(
      addMessage({
        body,
        id,
        username,
        channelId,
      }),
    );
  });

  socket.on('newChannel', (channel) => {
    const {
      data: {
        attributes: { name, removable, id },
      },
    } = channel;

    store.dispatch(addChannel({ name, removable, id }));
  });

  socket.on('renameChannel', (channel) => {
    const {
      data: {
        attributes: { name, id },
      },
    } = channel;

    store.dispatch(renameChannel({ name, id }));
  });

  socket.on('removeChannel', (channelId) => {
    const {
      data: { id },
    } = channelId;

    store.dispatch(removeChannel({ id }));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App socket={io()} />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('app'),
  );
};
