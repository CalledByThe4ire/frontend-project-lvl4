import React from 'react';
import { Provider } from 'react-redux';
import NicknameProvider from '../../context/nickname';
import WebSocketProvider from '../../context/websocket';
import Chat from '../chat';
import store from '../../store';

const App = () => (
  <Provider store={store}>
    <WebSocketProvider>
      <NicknameProvider>
        <Chat />
      </NicknameProvider>
    </WebSocketProvider>
  </Provider>
);

export default App;
