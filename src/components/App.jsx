import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserContext from '../context/UserContext';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
} from '../features/channels/channelsSlice';
import {
  addMessage,
  removeMessagesByChannelId,
} from '../features/messages/messagesSlice';
import NavBar from './Navbar';
import Layout from './Layout';
import Channels from '../features/channels/Channels';
import Messages from '../features/messages/Messages';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  const nickname = useContext(UserContext);

  const channels = useSelector((state) => state.channelsInfo.channels);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      const {
        data: {
          attributes: { message: body, id, channelId },
        },
      } = msg;

      dispatch(
        addMessage({
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

      dispatch(addChannel({ name, removable, id }));
    });

    socket.on('renameChannel', (channel) => {
      const {
        data: {
          attributes: { name, id },
        },
      } = channel;

      dispatch(renameChannel({ name, id }));
    });

    socket.on('removeChannel', (channelId) => {
      const {
        data: { id },
      } = channelId;

      dispatch(removeChannel({ id }));
      dispatch(removeMessagesByChannelId({ id }));
      dispatch(
        setCurrentChannelId({
          id: channels.find(
            (channel) => channel.name === 'general' && !channel.removable,
          ).id,
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
export default App;
