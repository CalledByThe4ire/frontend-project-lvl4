import React from 'react';
import {
  Badge, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from './channelsSlice';
import { openModal } from '../modal/modalSlice';
import Modal from '../modal/Modal';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);

  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );

  const isModalOpened = useSelector((state) => state.modal.isOpened);

  const dispatch = useDispatch();

  const handleOpenModalClick = (payload = {}) => {
    dispatch(openModal(payload));
  };

  const handleCurrentChannelClick = (id) => {
    dispatch(setCurrentChannelId({ id }));
  };

  return (
    <>
      <div className="d-flex flex-nowrap align-items-center mb-2">
        <h5 className="h5 m-0 mr-1">Channels</h5>
        <Badge
          variant="primary"
          className="ml-auto"
          role="button"
          onClick={() => handleOpenModalClick({ type: 'add' })}
        >
          +
        </Badge>
      </div>
      {channels.map((channel) => (
        <Dropdown
          as={ButtonGroup}
          key={channel.id}
          className="d-flex mb-2"
          onToggle={() => handleCurrentChannelClick(channel.id)}
        >
          <Button
            className="w-100 text-left"
            variant={currentChannelId === channel.id ? 'primary' : 'secondary'}
            onClick={() => handleCurrentChannelClick(channel.id)}
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
              />

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleOpenModalClick({ id: channel.id, type: 'rename' })}
                >
                  Rename
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => handleOpenModalClick({ id: channel.id, type: 'remove' })}
                >
                  Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      ))}
      {isModalOpened && <Modal />}
    </>
  );
};

export default Channels;
