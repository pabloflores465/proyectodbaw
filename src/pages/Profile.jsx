import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserProfileContext } from "../App";
import { useContext } from "react";
import axios from "axios";

function Profile({ show, setShow }) {
  const [validated, setValidated] = useState(false);
  const {userProfile, setUserProfile} = useContext(UserProfileContext)
    let temp = userProfile;
  
  const handleSubmit = async (event) => {
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try{
      const response = await axios.put('http://localhost/proyectodbaw/phpsql/profile.php',{
        firstname : temp.firstName,
        lastname : temp.lastName,
        email : temp.email,
        birthdate : temp.birthDate,
        address : temp.address,
        phonenumber : parseInt(temp.phoneNumber),
        cardnumber : parseInt(temp.cardNumber),
        expiredate : temp.expireDate,
        iduser : parseInt(temp.userId)
      });
      if (response.data.status==="success") {
        console.log("Actualizado");
      }else{
        console.log("no actualizado");
        console.log(response);
      }
    }catch(error){
      console.error('Error: ',error);
    }
    setValidated(true);
  };

  const [activeBilling, setActiveBilling] = useState(false);

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
            <Form.Control required placeholder={userProfile.firstName} onChange={(e)=>{
              temp.firstName = e.target.value
              setUserProfile(temp)
            }} type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control required placeholder={userProfile.lastName} onChange={(e)=>{
              temp.lastName = e.target.value
              setUserProfile(temp)
            }} type="text" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateEmail">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control
              required
              placeholder={userProfile.email}
              onChange={(e)=>{
                temp.email = e.target.value
                setUserProfile(temp)
              }}
              type="email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateBirthdate">
            <Form.Label className="text-success">BirthDate </Form.Label>
            <Form.Control required placeholder={userProfile.birthDate} type="date"  onChange={(e)=>{console.log(e.target.value)}}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePhone">
            <Form.Label className="text-success">Phone Number </Form.Label>
            <Form.Control required placeholder={userProfile.phoneNumber} onChange={(e)=>{
              temp.phoneNumber = e.target.value
              setUserProfile(temp)
            }} type="number" />
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
                onChange={(e)=>{
                  temp.cardNumber = e.target.value
                  setUserProfile(temp)
                }}
                placeholder={userProfile.cardNumber}
                type="number"
              />
              <Form.Label className="text-success">Expire Date </Form.Label>
              <Form.Control onChange={(e)=>{
              temp.expireDate = e.target.value
              setUserProfile(temp)
            }} placeholder={userProfile.expireDate} type="date" />
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