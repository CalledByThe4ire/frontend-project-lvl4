import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import gon from 'gon';
import { NicknameContext } from '../../context/nickname';
import { channelsActions, messagesActions } from '../../redux';
import NavBar from '../navbar';
import Layout from '../layout';
import Channels from '../channels';
import Messages from '../messages';

const App = () => {
  const socket = io();

  const dispatch = useDispatch();

  const nickname = useContext(NicknameContext);

  const {
    addChannelSuccess,
    renameChannelSuccess,
    removeChannelSuccess,
    setCurrentChannelId,
  } = channelsActions;

  const { addMessageSuccess, removeChannelMessages } = messagesActions;

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      const {
        data: {
          attributes: { message: body, id, channelId },
        },
      } = msg;

      dispatch(
        addMessageSuccess({
          body,
          id,
          nickname,
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

      dispatch(addChannelSuccess({ name, removable, id }));
    });

    socket.on('renameChannel', (channel) => {
      const {
        data: {
          attributes: { name, id },
        },
      } = channel;

      dispatch(renameChannelSuccess({ name, id }));
    });

    socket.on('removeChannel', (channelId) => {
      const {
        data: { id },
      } = channelId;

      dispatch(removeChannelSuccess({ id }));
      dispatch(removeChannelMessages({ id }));
      dispatch(setCurrentChannelId(gon.currentChannelId));
    });
  }, []);

  return (
    <>
      <NavBar />
      <Layout left={<Channels />} right={<Messages />} />
    </>
  );
};
export default App;
