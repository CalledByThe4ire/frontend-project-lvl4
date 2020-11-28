import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';
import {
  addChannelRequest,
  renameChannelRequest,
  removeChannelRequest,
} from '../channels/channelsSlice';
import { closeModal } from './modalSlice';
import { LoadingStatus, ModalType } from '../../const';

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

  const loadingStatus = useSelector(
    (state) => state.channelsInfo.loadingStatus,
  );

  const handleClose = () => {
    setShow(false);
    dispatch(closeModal());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { type, target } = event;

    const form = type === 'submit' ? target : formRef.current;

    if (form.checkValidity() !== 'false') {
      setValidated(true);
    }

    if (inputRef.current) {
      const { value } = inputRef.current;

      if (value !== '') {
        setName('');
        dispatch(closeModal());

        if (modalType === ModalType.ADD) {
          dispatch(addChannelRequest({ name: value }));
        } else if (modalType === ModalType.RENAME) {
          dispatch(renameChannelRequest({ id: channelId, name: value }));
        }
      }
    } else {
      dispatch(closeModal());
      dispatch(removeChannelRequest({ id: channelId }));
    }
  };

  useEffect(() => {
    if (modalType === ModalType.ADD) {
      inputRef.current.focus();
    } else if (modalType === ModalType.RENAME) {
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
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-0">
            {modalType !== ModalType.REMOVE ? (
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
          variant={modalType === ModalType.REMOVE ? 'danger' : 'primary'}
          onClick={handleSubmit}
        >
          {loadingStatus === LoadingStatus.PENDING ? (
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
