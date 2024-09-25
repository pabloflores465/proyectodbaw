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

  const [activeBilling, setActiveBilling] = useState(false);

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
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="ps-1 pe-1 overflow-auto">
          <Form.Group className="mb-3" controlId="validateName">
            <Form.Label className="text-success">First Name</Form.Label>
            <Form.Control required placeholder="John" type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control required placeholder="Doe" type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateEmail">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control
              required
              placeholder="example@gmail.com"
              type="email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateUsername">
            <Form.Label className="text-success">Username</Form.Label>
            <Form.Control required placeholder="John Doe" type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control required placeholder="Password#123" type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Text>Forgot Password?</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Born Date </Form.Label>
            <Form.Control required placeholder="01/01/2024" type="date" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePhone">
            <Form.Label className="text-success">Phone 1 </Form.Label>
            <Form.Control required placeholder="12344321" type="number" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="text-success">Phone 2 </Form.Label>
            <Form.Control placeholder="12344321" type="number" />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">
              Billing Profile
            </Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              className=" mb-3"
              onChange={()=>setActiveBilling(!activeBilling)}
            />
          </Form.Group>
          {activeBilling === true ? (
            <Form.Group className="mb-3">
                <Form.Label className="text-success">Card Number </Form.Label>
                <Form.Control className="mb-3" placeholder="12344321" type="number" />
                <Form.Label className="text-success">CCV </Form.Label>
                <Form.Control placeholder="123" type="number" />
                <Form.Label className="text-success">Expire Date </Form.Label>
                <Form.Control required placeholder="01/01/2024" type="date" />
            </Form.Group>
          ):null}
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
