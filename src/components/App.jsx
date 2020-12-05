import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
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
      <Container className="h-100 mb-3 border border-top-0 border-bottom-0">
        <Row className="h-100 px-xs-0 px-sm-3">
          <Col xs sm={3} className="border-right pl-xs-3 pl-sm-0">
            <Channels />
          </Col>
          <Col className="h-100 pr-xs-3 pr-sm-0">
            <Messages />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default App;
