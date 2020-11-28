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
import { addMessageRequest } from './messagesSlice';
import Message from './Message';
import Error from '../../components/Error';
import { LoadingStatus } from '../../const';

const Messages = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );

  const loadingStatus = useSelector(
    (state) => state.messagesInfo.loadingStatus,
  );

  const error = useSelector((state) => state.messagesInfo.error);

  const messages = useSelector((state) => state.messagesInfo.messages);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = currentChannelId;

    dispatch(addMessageRequest({ id, message }));
    setMessage('');
  };

  return (
    <div className="d-flex h-100 flex-column">
      <div className="overflow-auto d-flex flex-wrap mb-3">
        {!error
          && messages.length !== 0
          && messages
            .filter((msg) => msg.channelId === currentChannelId)
            .map(({ id, body, nickname }) => (
              <Message key={id} message={{ body, nickname }} />
            ))}
        {error && <Error />}
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
              className={classnames({
                disabled: !message || loadingStatus === LoadingStatus.PENDING,
              })}
              disabled={!message || loadingStatus === LoadingStatus.PENDING}
              style={{ cursor: !message ? 'not-allowed' : 'pointer' }}
            >
              {loadingStatus === LoadingStatus.PENDING ? (
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
