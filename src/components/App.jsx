import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './Navbar';
import Channels from '../features/channels/Channels';
import Messages from '../features/messages/Messages';

const App = () => (
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
export default App;
