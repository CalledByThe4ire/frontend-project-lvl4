import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { NicknameContext } from '../../context/nickname.jsx';
import { addMessageSucess } from '../../actions/messagesActions';
import NavBar from '../navbar';
import Layout from '../layout';
import Channels from '../channels';
import Messages from '../messages';

const Chat = () => {
  const socket = io();
  const dispatch = useDispatch();

  const nickname = useContext(NicknameContext);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      const {
        data: {
          attributes: { message: body, id, channelId },
        },
      } = msg;

      dispatch(
        addMessageSucess({
          body,
          id,
          nickname,
          channelId,
        }),
      );
    });
  }, []);

  return (
    <>
      <NavBar />
      <Layout left={<Channels />} right={<Messages />} />
    </>
  );
};
export default Chat;
