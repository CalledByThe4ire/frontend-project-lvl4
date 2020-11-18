import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import classnames from 'classnames';
import { closeModal } from '../../actions/modalActions';
import { addChannel } from '../../actions/channelsActions';

export default () => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const inputRef = useRef();

  const modalType = useSelector((state) => state.modal.type);

  const isLoading = useSelector((state) => state.channelsInfo.isLoading);

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  const handleClose = () => {
    setShow(false);
    dispatch(closeModal());
  };

  const handleSubmit = (event, value) => {
    event.preventDefault();

    if (value !== '') {
      switch (modalType) {
        case 'add':
          setName('');
          dispatch(addChannel(value));
          dispatch(closeModal());
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
        break;

      default:
        throw new Error(`Unknown type: ${modalType}`);
    }

    return null;
  }, []);

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
        <Form onSubmit={(event) => handleSubmit(event, inputRef.current.value)}>
          <Form.Group className="mb-0">
            {modalType !== 'remove' ? (
              <Form.Control
                type="text"
                ref={inputRef}
                value={name}
                onChange={handleChange}
              />
            ) : (
              <Form.Text>
                <h2 className="text-center text-danger">Are you sure?</h2>
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          className={classnames({ 'mr-auto': modalType === 'remove' })}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={modalType === 'remove' ? 'danger' : 'primary'}
          disabled={!name}
          style={{ cursor: !name ? 'not-allowed' : 'pointer' }}
          onClick={(event) => handleSubmit(event, inputRef.current.value)}
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            `${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
