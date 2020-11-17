import React from 'react';
import {
  Badge, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../../actions/channelsActions';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);

  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
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
        <Dropdown as={ButtonGroup} key={channel.id} className="d-flex mb-2">
          <Button
            className="w-100 text-left"
            variant={currentChannelId === channel.id ? 'primary' : 'secondary'}
            onClick={() => handleClick(channel.id)}
          >
            {channel.name}
          </Button>

          {channel.removable && (
            <>
              <Dropdown.Toggle
                split
                variant={
                  currentChannelId === channel.id ? 'primary' : 'secondary'
                }
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Rename</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">Remove</Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      ))}
    </>
  );
};

export default Channels;
