import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import classnames from 'classnames';

export default () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const modalType = useSelector((state) => state.channelsInfo.modal.type);

  return (
    <Modal show={show} backdrop="static" centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Channel`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-0">
            {modalType !== 'remove' ? (
              <Form.Control type="text" />
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
          variant={modalType === 'remove' ? 'danger' : 'primary'}
          onClick={handleClose}
        >
          {`${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
