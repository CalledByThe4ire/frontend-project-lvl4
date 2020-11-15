import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message: { nickname, body } }) => (
  <p className="w-100">
    <span className="font-weight-bold">
      {nickname}
      {': '}
    </span>
    <span className="font-italic">{body}</span>
  </p>
);

Message.propTypes = {
  message: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
