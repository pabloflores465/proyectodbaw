import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";
import signUp from "../conections/signUp";

function Signup({ show, setShow }) {
  let validated = false;
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    birthdate: "",
    address: "",
    cardnumber: "",
    expdate: "",
  });

  const [activeBilling, setActiveBilling] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const { setNotifications } = useContext(NotificationContext);

  const handleInput = (value, name) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setActiveBilling(false);
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
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => signUp(user, event, confirm, setNotifications)}
          className="ps-1 pe-1 overflow-auto"
        >
          <Form.Group className="mb-3" controlId="validateUserName">
            <Form.Label className="text-success">Profile Picture</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateName">
            <Form.Label className="text-success">First Name</Form.Label>
            <Form.Control
              required
              placeholder="John"
              type="text"
              name="firstname"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control
              required
              placeholder="Doe"
              type="text"
              name="lastname"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateEmail">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control
              required
              placeholder="example@gmail.com"
              type="email"
              name="email"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control
              required
              placeholder="Password#123"
              type="password"
              name="password"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Unmached Passwords
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Confirm Password</Form.Label>
            <Form.Control
              required
              placeholder="Password#123"
              type="password"
              onChange={(e) => {
                e.target.value === user.password
                  ? setConfirm(true)
                  : setConfirm(false);
              }}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Unmached Passwords
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Birth Date </Form.Label>
            <Form.Control
              required
              placeholder="01/01/2024"
              type="date"
              name="birthdate"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Address </Form.Label>
            <Form.Control
              required
              placeholder="Fraijanes, Guatemala"
              type="text"
              name="address"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePhone">
            <Form.Label className="text-success">Phone number </Form.Label>
            <Form.Control
              required
              placeholder="12344321"
              type="number"
              name="phonenumber"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">Billing Profile</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              className=" mb-3"
              defaultChecked={activeBilling}
              onChange={(e) => setActiveBilling(e.target.checked)}
            />
          </Form.Group>
          {activeBilling ? (
            <Form.Group className="mb-3">
              <Form.Label className="text-success">Card Number </Form.Label>
              <Form.Control
                className="mb-3"
                placeholder="12344321"
                type="number"
                name="cardnumber"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
              <Form.Label className="text-success">Expire Date </Form.Label>
              <Form.Control
                required
                placeholder="01/01/2024"
                type="date"
                name="expdate"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            </Form.Group>
          ) : null}
          <Button
            variant="secondary text-white rounded-pill w-100"
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
