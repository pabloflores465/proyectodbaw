import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Signup({ show, setShow }) {
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
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control required placeholder="example@gmail.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-success">Username</Form.Label>
            <Form.Control required placeholder="John Doe" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control required placeholder="Password#123" />
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

export default Signup;
