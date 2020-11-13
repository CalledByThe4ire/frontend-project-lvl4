import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = ({ left, right }) => (
  <Container className="h-100 mb-3">
    <Row className="h-100">
      <Col xs sm={3} className="border-right pl-xs-3 pl-sm-0">
        {left}
      </Col>
      <Col className="h-100 pr-xs-3 pr-sm-0">{right}</Col>
    </Row>
  </Container>
);

Layout.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
};

export default Layout;
