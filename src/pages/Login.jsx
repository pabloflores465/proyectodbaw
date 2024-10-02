import React, { useContext, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import axios from "axios"
import { UserProfileContext } from "../App";

function Login({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [validated, setValidated] = useState(false);
  const [password, setPassword]=useState("");
  //const {email, setEmail} = useContext(EmailContext);
  const {userProfile, setUserProfile} = useContext(UserProfileContext)

  const handleSubmit = async (event) => {
    let temp = userProfile
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    
    try{
      const response = await axios.post('http://localhost/proyectodbaw/phpsql/login.php',{
        email: temp.email.trim(),
        password: password

      });
      if (response.data.status==="success") {
        temp.email = response.data.email;
        temp.rol = parseInt(response.data.rol);
        temp.firstName = response.data.firstname;
        temp.lastName = response.data.lastname;
        temp.birthDate = response.data.birthdate;
        temp.address =  response.data.address;
        temp.cardNumber = response.data.cardnumber;
        temp.expireDate = response.data.expiredate;
        temp.phoneNumber = response.data.phonenumber;
        temp.lastConection = response.data.lastconnection;
        temp.active = parseInt(response.data.active);
        temp.userId = parseInt(response.data.userid)
        console.log("Logueado",response.data.rol);
        setValidated(true);
        setShow(false);
        setUserProfile(temp)
      }else{

        console.log("no logueado");
        console.log(response);
      }
    }catch(error){
      console.error('Error: ',error);
    }

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
            <Form.Label className="text-success">E-mail</Form.Label>
            <Form.Control required placeholder="John Doe" type="text" value= {userProfile.email} onChange={(e)=>{
              let temp = userProfile
              temp.email = e.target.value
              setUserProfile(temp)
            }}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validatePassword">
            <Form.Label className="text-success">Password</Form.Label>
            <Form.Control required placeholder="Password#123" type="password" value= {password} onChange={(e)=>setPassword(e.target.value)}/>
            <Form.Text>Forgot Password?</Form.Text>
          </Form.Group>
          <Button
            variant="secondary text-white rounded-pill w-100"
            type="submit"
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
