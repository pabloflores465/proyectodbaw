import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Login({ show, setShow }) {
  const handleClose = () => setShow(false);
  return (
    <Modal
      centered
      className="text-white shadow"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header className="bg-primary rounded-top pt-1 pb-2 pe-3 ps-3" closeButton>
        <Modal.Title>
          Log In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="text-success">Username</Form.Label>
            <Form.Control required placeholder="John Doe" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control required placeholder="Password#123" />
            <Form.Text>Forgot Password?</Form.Text>
          </Form.Group>
        </Form>
        <Button
          variant="secondary text-white rounded-pill w-100"
          onSubmit={handleClose}
          type="submit"
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
