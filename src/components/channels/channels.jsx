import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../../actions/channelsActions';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);

  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <>
      <div className="d-flex flex-nowrap align-items-center mb-2">
        <h5 className="h5 m-0 mr-1">Channels</h5>
        <Badge variant="primary" className="ml-auto" role="button">
          +
        </Badge>
      </div>
      {channels.map((channel) => (
        <Button
          variant={channel.id === currentChannelId ? 'primary' : 'secondary'}
          className="nav-link btn btn-block mb-2 text-left"
          onClick={() => handleClick(channel.id)}
        >
          {channel.name}
        </Button>
      ))}
    </>
  );
};

export default Channels;
