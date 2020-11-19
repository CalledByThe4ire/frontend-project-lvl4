import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from 'react-bootstrap';
import Message from '../message';
import Error from '../error';
import { addMessage } from '../../actions/messagesActions';

const Messages = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );

  const isLoading = useSelector((state) => state.messagesInfo.isLoading);

  const error = useSelector((state) => state.messagesInfo.error);

  const messages = useSelector((state) => state.messagesInfo.messages);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addMessage(currentChannelId, message));
    setMessage('');
  };

  return (
    <div className="d-flex h-100 flex-column">
      <div className="overflow-auto d-flex flex-wrap mb-3">
        {!isLoading
          && messages.length !== 0
          && messages
            .filter((msg) => msg.channelId === currentChannelId)
            .map(({ id, body, nickname }) => (
              <Message key={id} message={{ body, nickname }} />
            ))}
        {!isLoading && error && <Error />}
      </div>
      <Form noValidate className="mt-auto flex-nowrap" onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            placeholder="Add message"
            className="text-truncate"
            type="text"
            value={message}
            onChange={handleChange}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              type="submit"
              className={classnames({ disabled: !message || isLoading })}
              disabled={!message || isLoading}
              style={{ cursor: !message ? 'not-allowed' : 'pointer' }}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Messages;
