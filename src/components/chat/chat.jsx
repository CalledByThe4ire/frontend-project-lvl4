import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Badge,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const Chat = ({ gon }) => {
  const { channels, currentChannelId } = gon;

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>Chat App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="h-100 mb-3">
        <Row className="h-100">
          <Col xs sm={3} className="border-right pl-xs-3 pl-sm-0">
            <div className="d-flex flex-nowrap align-items-center mb-2">
              <h5 className="h5 m-0 mr-1">Channels</h5>
              <Badge variant="primary" className="ml-auto" role="button">
                +
              </Badge>
            </div>
            <Nav variant="pills" className="flex-column nav-fill">
              {channels.map((channel) => (
                <Nav.Item key={channel.id}>
                  <Button
                    variant={
                      channel.id === currentChannelId ? 'primary' : 'secondary'
                    }
                    className="nav-link btn btn-block mb-2 text-left"
                  >
                    {channel.name}
                  </Button>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col className="h-100 pr-xs-3 pr-sm-0">
            <div className="d-flex h-100 flex-column">
              <div className="overflow-auto mb-3"> </div>
              <Form noValidate className="mt-auto flex-nowrap">
                <InputGroup>
                  <FormControl
                    placeholder="Add message"
                    className="text-truncate"
                    type="text"
                  />
                  <InputGroup.Append>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Chat.propTypes = {
  gon: PropTypes.shape({
    channels: PropTypes.instanceOf(Array),
    messages: PropTypes.instanceOf(Array),
    currentChannelId: PropTypes.number,
  }).isRequired,
};

export default Chat;
