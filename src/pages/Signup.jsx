import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios"

function Signup({ show, setShow }) {
  const [validated, setValidated] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLatsname] = useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phonenumber, setPhonenumber]=useState("");
  const [birthdate, setBirthdate]=useState("");
  const [address, setAddress]=useState("");
  const [cardnumber, setCardnumber]=useState("");
  const [expdate, setExpdate]=useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try{
      const response = await axios.put('http://localhost/proyectodbaw/phpsql/signup.php',{
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password,
        phonenumber : phonenumber,
        birthdate : birthdate,
        address : address,
        cardnumber : cardnumber,
        expdate : expdate
      });
      if (response.data.status==="success") {
        console.log("Registrado");
        setValidated(true);
        setShow(false)
      }else{

        console.log("no registrado");
        console.log(email, password);
        console.log(response);
      }
    }catch(error){
      console.error('Error: ',error);
    }
  };

  const [activeBilling, setActiveBilling] = useState(false);

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
          onSubmit={handleSubmit}
          className="ps-1 pe-1 overflow-auto"
        >
          <Form.Group className="mb-3" controlId="validateUserName">
            <Form.Label className="text-success">Profile Picture</Form.Label>
            <Form.Control type="file"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateName">
            <Form.Label className="text-success">First Name</Form.Label>
            <Form.Control required placeholder="John" type="text" onChange={(e)=>setFirstname(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateLastName">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control required placeholder="Doe" type="text" onChange={(e)=>setLatsname(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validateEmail">
            <Form.Label className="text-success">E-Mail</Form.Label>
            <Form.Control
              required
              placeholder="example@gmail.com"
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control required placeholder="Password#123" type="text" onChange={(e)=>setPassword(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Text>Forgot Password?</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Birth Date </Form.Label>
            <Form.Control required placeholder="01/01/2024" type="date" onChange={(e)=>setBirthdate(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Address </Form.Label>
            <Form.Control required placeholder="Fraijanes, Guatemala" type="text" onChange={(e)=>setAddress(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validatePhone">
            <Form.Label className="text-success">Phone number </Form.Label>
            <Form.Control required placeholder="12344321" type="number" onChange={(e)=>setPhonenumber(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">Billing Profile</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              className=" mb-3"
              onChange={() => setActiveBilling(!activeBilling)}
            />
          </Form.Group>
          {activeBilling === true ? (
            <Form.Group className="mb-3">
              <Form.Label className="text-success">Card Number </Form.Label>
              <Form.Control
                className="mb-3"
                placeholder="12344321"
                type="number"
                onChange={(e)=>setCardnumber(e.target.value)}
              />
              <Form.Label className="text-success">Expire Date </Form.Label>
              <Form.Control required placeholder="01/01/2024" type="date" onChange={(e)=>setExpdate(e.target.value)}/>
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
