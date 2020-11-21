import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';

import { channelsActions, modalActions } from '../../redux';

export default () => {
  const [show, setShow] = useState(true);

  const [name, setName] = useState('');

  const [validated, setValidated] = useState(false);

  const { closeModal } = modalActions;

  const { addChannel, renameChannel, removeChannel } = channelsActions;

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

  const handleFormProcessing = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { type, target } = event;

    const form = type === 'submit' ? target : formRef.current;

    if (form.checkValidity() !== 'false') {
      setValidated(true);
    }

    if (inputRef.current) {
      if (inputRef.current.value !== '') {
        setName('');
        dispatch(closeModal());
        if (modalType === 'add') {
          dispatch(addChannel(inputRef.current.value));
        } else if (modalType === 'rename') {
          dispatch(renameChannel(channelId, inputRef.current.value));
        }
      }
    } else {
      dispatch(closeModal());
      dispatch(removeChannel(channelId));
    }
  };

  useEffect(() => {
    if (modalType === 'add') {
      inputRef.current.focus();
    } else if (modalType === 'rename') {
      inputRef.current.select();
      inputRef.current.focus();
    }

    return null;
  });

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
          onSubmit={handleFormProcessing}
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
          onClick={handleFormProcessing}
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
