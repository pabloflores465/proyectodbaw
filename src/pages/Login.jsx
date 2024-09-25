import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Login({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal
      centered
      className="text-white shadow"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header
        className="bg-primary rounded-top pt-1 pb-2 pe-3 ps-3"
        closeButton
      >
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="ps-1 pe-1 overflow-auto"
        >
          <Form.Group className="mb-3" controlId="validateUserName">
            <Form.Label className="text-success">Username</Form.Label>
            <Form.Control required placeholder="John Doe" type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control required placeholder="Password#123" type="text" />
            <Form.Text>Forgot Password?</Form.Text>
          </Form.Group>
          <Button
            variant="secondary text-white rounded-pill w-100"
            onSubmit={handleClose}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
