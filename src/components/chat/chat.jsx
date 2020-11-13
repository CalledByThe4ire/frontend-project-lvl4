import React from 'react';
import { Provider } from 'react-redux';
import NavBar from '../navbar';
import Layout from '../layout';
import Channels from '../channels';
import Messages from '../messages';
import store from '../../store';

const Chat = () => (
  <Provider store={store}>
    <>
      <NavBar />
      <Layout left={<Channels />} right={<Messages />} />
    </>
  </Provider>
);

export default Chat;
