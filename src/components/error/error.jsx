import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const Error = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      backdrop="static"
      centered
      onHide={handleClose}
      onEscapeKeyDown={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Something goes wrong…</Modal.Title>
      </Modal.Header>
      <Modal.Body>Try again later</Modal.Body>
    </Modal>
  );
};

export default Error;
