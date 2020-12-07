import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import classnames from 'classnames';
import routes from '../../routes';
import { closeModal } from './modalSlice';
import { ModalType } from '../../const';

export default () => {
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const modalType = useSelector((state) => state.modal.type);

  const channelsSelector = (state) => state.channelsInfo.channels;

  const currentChannelId = useSelector((state) => state.modal.extra);

  const channelsNames = createSelector(channelsSelector, (channels) =>
    // eslint-disable-next-line
    channels.map((channel) => channel.name))(useSelector((state) => state));

  const channels = useSelector(channelsSelector);

  const currentChannel = channels.find((c) => c.id === currentChannelId);

  const requiredSchema = Yup.string().required('Required');

  const alphanumericSchema = Yup.string().matches(
    /^[a-z0-9]+$/i,
    'Only alphanumeric allowed',
  );

  const minCharactersSchema = Yup.string().min(
    3,
    `Must be at least ${3} characters`,
  );

  const notOneOfSchema = Yup.string().notOneOf(channelsNames, 'Must be unique');

  const schema = Yup.object({
    channelName: Yup.string()
      .concat(requiredSchema)
      .concat(alphanumericSchema)
      .concat(minCharactersSchema)
      .concat(modalType === ModalType.ADD ? notOneOfSchema : null),
  });

  const handleClose = () => {
    setShow(false);
    dispatch(closeModal());
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
      <Formik
        validationSchema={modalType !== ModalType.REMOVE ? schema : null}
        onSubmit={async (
          { channelName },
          { setSubmitting, resetForm, setErrors },
        ) => {
          setSubmitting(false);

          try {
            switch (modalType) {
              case ModalType.ADD:
                await axios.post(`${routes.channelsPath()}`, {
                  data: { attributes: { name: channelName } },
                });
                break;

              case ModalType.RENAME:
                await axios.patch(`${routes.channelPath(currentChannelId)}`, {
                  data: {
                    attributes: { id: currentChannelId, name: channelName },
                  },
                });
                break;

              case ModalType.REMOVE:
                await axios.delete(`${routes.channelPath(currentChannelId)}`);
                break;

              default:
                throw new Error(`Unknown modal's type: ${modalType}`);
            }

            resetForm({ values: '' });
            dispatch(closeModal());
          } catch (err) {
            console.error(err.message);

            setErrors({
              requestFailure: 'Something went wrong… Please, try again later',
            });
          }
        }}
        initialValues={{
          channelName: currentChannel ? currentChannel.name : '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-0" style={{ minHeight: '65px' }}>
                {modalType === ModalType.REMOVE ? (
                  <p className="m-0">
                    This operation cannot be undone. Would you like to proceed?
                  </p>
                ) : (
                  <>
                    <Form.Control
                      ref={inputRef}
                      type="text"
                      name="channelName"
                      value={values.channelName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.channelName && !Object.keys(errors).length
                      }
                      isInvalid={!!Object.keys(errors).length}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[Object.keys(errors).find((v) => v)]}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant={modalType === ModalType.REMOVE ? 'danger' : 'primary'}
                type="submit"
                className={classnames({ disabled: !!errors.channelName })}
                disabled={
                  (touched.channelName && !!errors.channelName) || isSubmitting
                }
                style={{
                  cursor: errors.channelName ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? (
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
