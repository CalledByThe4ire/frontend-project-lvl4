import React from 'react';
import PropTypes from 'prop-types';

const Chat = ({ data }) => {
  const { channels } = data;
  return (
    <ul className="list-group">
      {channels.map((channel) => (
        <li key={channel.id} className="list-group-item">
          {channel.name}
        </li>
      ))}
    </ul>
  );
};

Chat.propTypes = {
  data: PropTypes.shape({
    channels: PropTypes.instanceOf(Array),
    messages: PropTypes.instanceOf(Array),
    currentChannelId: PropTypes.number,
  }).isRequired,
};

export default Chat;
