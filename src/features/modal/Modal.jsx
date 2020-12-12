import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import classnames from 'classnames';
import routes from '../../routes';
import { closeModal } from './modalSlice';
import { ModalType, ErrorsType } from '../../const';
import {
  channelsNamesSelector,
  currentChannelSelector,
} from '../channels/channelsSelectors';
import { modalExtraSelector, modalTypeSelector } from './modalSelectors';

export default () => {
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const selectSelf = (state) => state;

  const modalType = useSelector(modalTypeSelector);

  const currentChannelId = useSelector(modalExtraSelector);

  const currentChannel = useSelector(currentChannelSelector);

  const requiredSchema = Yup.string().required(i18next.t(ErrorsType.REQUIRED));

  const alphanumericSchema = Yup.string().matches(
    /^[a-z0-9]+$/i,
    i18next.t(ErrorsType.ALPHANUMERIC)
  );

  const minCharactersSchema = Yup.string().min(
    3,
    i18next.t(ErrorsType.MIN_CHARACTERS)(3)
  );

  const notOneOfSchema = Yup.string().notOneOf(
    channelsNamesSelector(useSelector(selectSelf)),
    i18next.t(ErrorsType.UNIQUE)
  );

  const schema = Yup.object({
    channelName: Yup.string()
      .concat(requiredSchema)
      .concat(alphanumericSchema)
      .concat(minCharactersSchema)
      .concat(modalType === ModalType.ADD ? notOneOfSchema : null),
  });

  const formik = useFormik({
    initialValues: {
      channelName:
        currentChannel && currentChannel.removable ? currentChannel.name : '',
    },
    validationSchema: modalType !== ModalType.REMOVE ? schema : null,
    onSubmit: async (
      { channelName },
      { setSubmitting, resetForm, setErrors }
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
          requestFailure: i18next.t(ErrorsType.REQUEST_FAILURE),
        });
      }
    },
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

      <Form noValidate onSubmit={formik.handleSubmit}>
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
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={
                    formik.touched.channelName &&
                    !Object.keys(formik.errors).length
                  }
                  isInvalid={!!Object.keys(formik.errors).length}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors[Object.keys(formik.errors).find((v) => v)]}
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
            className={classnames({ disabled: !!formik.errors.channelName })}
            disabled={
              (formik.touched.channelName && !!formik.errors.channelName) ||
              formik.isSubmitting
            }
            style={{
              cursor: formik.errors.channelName ? 'not-allowed' : 'pointer',
            }}
          >
            {formik.isSubmitting ? (
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
    </Modal>
  );
};
