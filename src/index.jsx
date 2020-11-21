// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NicknameProvider from './context/nickname';
import store from './store';
import '../assets/application.scss';
import App from './components/app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <Provider store={store}>
    <NicknameProvider>
      <App />
    </NicknameProvider>
  </Provider>,
  document.getElementById('app'),
);
