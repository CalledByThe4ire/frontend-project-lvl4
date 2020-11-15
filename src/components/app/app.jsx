import React from 'react';
import { Provider } from 'react-redux';
import NicknameProvider from '../../context/nickname';
import Chat from '../chat';
import store from '../../store';

const App = () => (
  <Provider store={store}>
    <NicknameProvider>
      <Chat />
    </NicknameProvider>
  </Provider>
);

export default App;
