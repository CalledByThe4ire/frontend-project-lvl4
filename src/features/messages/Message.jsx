import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message: { username, body } }) => (
  <p className="w-100">
    <span className="font-weight-bold">
      {username}
      {': '}
    </span>
    <span className="font-italic">{body}</span>
  </p>
);

Message.propTypes = {
  message: PropTypes.shape({
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
