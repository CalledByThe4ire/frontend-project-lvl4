import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';
import { closeModal } from '../../actions/modalActions';
import { addChannel } from '../../actions/channelsActions';

export default () => {
  const [show, setShow] = useState(true);

  const [name, setName] = useState('');

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const inputRef = useRef();

  const formRef = useRef();

  const modalType = useSelector((state) => state.modal.type);

  const channelId = useSelector((state) => state.modal.extra);

  const channels = useSelector((state) => state.channelsInfo.channels);

  const isLoading = useSelector((state) => state.channelsInfo.isLoading);

  const handleClose = () => {
    setShow(false);
    dispatch(closeModal());
  };

  const handleFormProcessing = (event, value) => {
    const { type, target } = event;

    const form = type === 'submit' ? target : formRef.current;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (validated) {
      switch (modalType) {
        case 'add':
          setName('');
          dispatch(addChannel(value));
          dispatch(closeModal());
          break;

        case 'rename':
          break;

        case 'remove':
          break;

        default:
          throw new Error(`Unknown type: ${modalType}`);
      }
    }
  };

  useEffect(() => {
    switch (modalType) {
      case 'add':
        inputRef.current.focus();
        break;

      case 'rename':
        inputRef.current.select();
        inputRef.current.focus();
        break;

      case 'remove':
        break;

      default:
        throw new Error(`Unknown type: ${modalType}`);
    }

    return null;
  }, [name]);

  return (
    <Modal
      show={show}
      backdrop="static"
      centered
      onHide={handleClose}
      onEscapeKeyDown={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Channel`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={(event) => handleFormProcessing(event, inputRef.current.value)}
        >
          <Form.Group className="mb-0">
            {modalType !== 'remove' ? (
              <>
                <Form.Control
                  type="text"
                  ref={inputRef}
                  defaultValue={
                    channelId
                      ? channels.find((c) => c.id === channelId).name
                      : name
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide channel name.
                </Form.Control.Feedback>
              </>
            ) : (
              <p className="m-0">
                This operation cannot be undone. Would you like to proceed?
              </p>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={modalType === 'remove' ? 'danger' : 'primary'}
          onClick={(event) => handleFormProcessing(event, inputRef.current.value)}
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            `${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
