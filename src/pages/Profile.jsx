import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContext } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import { NotificationContext } from "../context/NotificationContext";
import updateProfile from "../conections/updateProfile";

function Profile({ show, setShow }) {
  const [activeBilling, setActiveBilling] = useState(false);

  const handleClose = () => {
    setShow(false);
    setActiveBilling(false);
  };

  const [validated, setValidated] = useState(false);
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const { setNotifications } = useContext(NotificationContext)

  const handleInput = (value, name) => {
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      [name]: value,
    }));
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
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event)=>{
            event.preventDefault();
            updateProfile(userProfile, setUserProfile, event, setNotifications, setShow, setValidated)}}
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
              defaultValue={userProfile.firstName}
              name = "firstName"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
              type="text"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control
              required
              defaultValue={userProfile.lastName}
              name = "lastName"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
              type="text"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateEmail">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control
              required
              defaultValue={userProfile.email}
              name = "email"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
              type="email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Address</Form.Label>
            <Form.Control
              required
              defaultValue={userProfile.address}
              name = "address"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
              type="text"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validateBirthdate">
            <Form.Label className="text-success">BirthDate </Form.Label>
            <Form.Control
              required
              placeholder={userProfile.birthDate}
              type="date"
              name="birthDate"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePhone">
            <Form.Label className="text-success">Phone Number </Form.Label>
            <Form.Control
              required
              placeholder={userProfile.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
              type="tel"
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
              onChange={() => setActiveBilling(!activeBilling)}
            />
          </Form.Group>
          {activeBilling === true ? (
            <Form.Group className="mb-3">
              <Form.Label className="text-success">Card Number </Form.Label>
              <Form.Control
                className="mb-3"
                name = "cardNumber"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
                defaultValue={userProfile.cardNumber}
                type="number"
              />
              <Form.Label className="text-success">Expire Date </Form.Label>
              <Form.Control
                name="expireDate"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
                placeholder={userProfile.expireDate}
                type="date"
              />
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
