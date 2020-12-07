import React from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import classnames from 'classnames';
import routes from '../../routes';
import Message from './Message';

const Messages = () => {
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );

  const messages = useSelector((state) => state.messagesInfo.messages);

  const requiredSchema = Yup.string().required('Required');

  const schema = Yup.object({
    message: Yup.string().concat(requiredSchema),
  });

  return (
    <div className="d-flex h-100 flex-column">
      <div className="overflow-auto d-flex flex-wrap mb-3">
        {messages
          .filter((msg) => msg.channelId === currentChannelId)
          .map(({ id, body, username }) => (
            <Message key={id} message={{ body, username }} />
          ))}
      </div>

      <Formik
        validationSchema={schema}
        onSubmit={async (
          { message },
          { setSubmitting, setErrors, resetForm },
        ) => {
          setSubmitting(false);

          try {
            await axios.post(
              `${routes.channelMessagesPath(currentChannelId)}`,
              {
                data: { attributes: { message } },
              },
            );

            resetForm({ values: '' });
          } catch (err) {
            console.error(err.message);
            setErrors({
              requestFailure: 'Something went wrong… Please, try again later',
            });
          }
        }}
        initialValues={{
          message: '',
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
          <Form
            className="mt-auto flex-nowrap"
            noValidate
            onSubmit={handleSubmit}
          >
            <InputGroup>
              <FormControl
                placeholder="Add message"
                className="text-truncate"
                type="text"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.message && !errors.message}
                isInvalid={!!errors.message}
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  type="submit"
                  className={classnames({ disabled: !!errors.message })}
                  disabled={
                    (touched.message && !!errors.message) || isSubmitting
                  }
                  style={{
                    cursor: errors.message ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? (
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
                {errors.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Messages;
