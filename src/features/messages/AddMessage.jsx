import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import classnames from 'classnames';
import routes from '../../routes';
import { ErrorsType } from '../../const';
import Message from './Message';
import { currentChannelIdSelector } from '../channels/channelsSelectors';
import { currentChannelMessagesSelector } from './messagesSelectors';

const Messages = () => {
  const inputRef = useRef(null);

  const currentChannelId = useSelector(currentChannelIdSelector);

  const currentChannelMessages = useSelector(currentChannelMessagesSelector);

  const requiredSchema = Yup.string().required(i18next.t(ErrorsType.REQUIRED));

  const schema = Yup.object({
    message: Yup.string().concat(requiredSchema),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: schema,
    onSubmit: async ({ message }, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(false);

      try {
        await axios.post(`${routes.channelMessagesPath(currentChannelId)}`, {
          data: { attributes: { message } },
        });

        resetForm({ values: '' });

        inputRef.current.focus();
      } catch (err) {
        console.error(err.message);

        setErrors({
          requestFailure: i18next.t(ErrorsType.REQUEST_FAILURE),
        });

        inputRef.current.select();
        inputRef.current.focus();
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="d-flex h-100 flex-column">
      <div className="overflow-auto d-flex flex-wrap mb-3">
        {currentChannelMessages.map(({ id, body, username }) => (
          <Message key={id} message={{ body, username }} />
        ))}
      </div>

      <Form
        className="mt-auto flex-nowrap"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <FormControl
            placeholder="Add message"
            className="text-truncate"
            type="text"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            isValid={
              formik.touched.message && !Object.keys(formik.errors).length
            }
            isInvalid={!!Object.keys(formik.errors).length}
            ref={inputRef}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              type="submit"
              className={classnames({ disabled: !!formik.errors.message })}
              disabled={
                (formik.touched.message && !!formik.errors.message) ||
                formik.isSubmitting
              }
              style={{
                cursor: formik.errors.message ? 'not-allowed' : 'pointer',
              }}
            >
              {formik.isSubmitting ? (
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
          <Form.Control.Feedback type="invalid">
            {formik.errors[Object.keys(formik.errors).find((v) => v)]}
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Messages;
