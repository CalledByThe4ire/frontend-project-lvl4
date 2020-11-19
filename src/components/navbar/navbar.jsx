import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';

const NavBar = ({ title }) => (
  <Navbar bg="primary" variant="dark" className="mb-3">
    <Container>
      <Navbar.Brand className="pl-xs-0 pl-sm-3">{title}</Navbar.Brand>
    </Container>
  </Navbar>
);

NavBar.defaultProps = {
  title: 'Chat App',
};

NavBar.propTypes = {
  title: PropTypes.string,
};

export default NavBar;
