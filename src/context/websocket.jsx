import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { addMessageSucess } from '../actions/messagesActions';

export const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const socket = io();

  const dispatch = useDispatch();

  const subscribeNewMessage = (nickname, channelId) => {
    socket.on('newMessage', (msg) => {
      const {
        data: {
          attributes: { message: body, id },
        },
      } = msg;

      dispatch(addMessageSucess({ body, id, nickname, channelId }));
    });
  };

  const ws = {
    subscribeNewMessage,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
