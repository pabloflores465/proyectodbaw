import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function Profile({ show, setShow }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };



  let profile = {
    name: "Pablo",
    lastName: "Flores",
    email: "hola@gmail.com",
    userName: "Pablo Flores",
    bornDate: "2024-01-01",
    phone1: 12344321,
    phone2: 43214321,
    activeBilling: true,
    cardNumber: 12345678,
    ccv: 789,
    expireDate: "2024-02-12",

  }
  const [activeBilling, setActiveBilling] = useState(profile.activeBilling);

  const handleClose = () => {
    setShow(false);
    setActiveBilling(false);
  };

  //setActiveBilling(profile.activeBilling)

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
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="ps-1 pe-1 overflow-auto"
        >
          <Form.Group className="mb-3" controlId="validateUserName">
            <Form.Label className="text-success">Profile Picture</Form.Label>
            <Form.Control type="file"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateName">
            <Form.Label className="text-success">First Name</Form.Label>
            <Form.Control required placeholder="John" value={profile.name} type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control required placeholder="Doe" value={profile.lastName} type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateEmail">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control
              required
              value={profile.email}
              placeholder="example@gmail.com"
              type="email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateUsername">
            <Form.Label className="text-success">Username</Form.Label>
            <Form.Control required value={profile.userName} placeholder="John Doe" type="text" />
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
            <Form.Control required value={profile.bornDate} placeholder="2024-01-01" type="date"  onChange={(e)=>{console.log(e.target.value)}}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePhone">
            <Form.Label className="text-success">Phone 1 </Form.Label>
            <Form.Control required value={profile.phone1} placeholder="12344321" type="number" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-success">Phone 2 </Form.Label>
            <Form.Control value={profile.phone2} placeholder="12344321" type="number" />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">Billing Profile</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              className=" mb-3"
              defaultChecked={profile.activeBilling}
              onChange={() => setActiveBilling(!activeBilling)}
            />
          </Form.Group>
          {profile.activeBilling === true ? (
            <Form.Group className="mb-3">
              <Form.Label className="text-success">Card Number </Form.Label>
              <Form.Control
                className="mb-3"
                value={profile.cardNumber}
                placeholder="12344321"
                type="number"
              />
              <Form.Label className="text-success">CCV </Form.Label>
              <Form.Control value={profile.ccv} placeholder="123" type="number" />
              <Form.Label className="text-success">Expire Date </Form.Label>
              <Form.Control value={profile.expireDate} placeholder="01/01/2024" type="date" />
            </Form.Group>
          ) : null}
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

export default Profile;