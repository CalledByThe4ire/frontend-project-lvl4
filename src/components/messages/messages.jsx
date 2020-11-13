import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const Messages = () => (
  <div className="d-flex h-100 flex-column">
    <div className="overflow-auto mb-3"> </div>
    <Form noValidate className="mt-auto flex-nowrap">
      <InputGroup>
        <FormControl
          placeholder="Add message"
          className="text-truncate"
          type="text"
        />
        <InputGroup.Append>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  </div>
);

export default Messages;
