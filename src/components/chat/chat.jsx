import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../navbar';
import Layout from '../layout';
import Channels from '../channels';
import Messages from '../messages';
import { NicknameContext } from '../../context/nickname';
import { WebSocketContext } from '../../context/websocket';

const Chat = () => {
  const nickname = useContext(NicknameContext);

  const ws = useContext(WebSocketContext);

  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);

  useEffect(() => {
    ws.subscribeNewMessage(nickname, channelId);
  }, []);

  return (
    <>
      <NavBar />
      <Layout left={<Channels />} right={<Messages />} />
    </>
  );
};

export default Chat;
