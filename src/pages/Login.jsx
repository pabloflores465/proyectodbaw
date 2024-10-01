import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import axios from "axios"
import { EmailContext, RolContext, UserNameContext } from "../App";

function Login({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [validated, setValidated] = useState(false);
  const [password, setPassword]=useState("");
  const {email, setEmail} = useContext(EmailContext);
  const {rol, setRol} = useContext(RolContext);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    
    try{
      const response = await axios.post('http://localhost/proyectodbaw/phpsql/login.php',{
        email: email.trim(),
        password: password.trim()

      });
      if (response.data.status==="success") {
        setEmail(response.data.email);
        setRol(response.data.rol);
        console.log("Logueado",response.data.rol);
        setValidated(true);
        setShow(false);
      }else{

        console.log("no logueado");
        console.log(email, password);
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
            <Form.Control required placeholder="John Doe" type="text" value= {email} onChange={(e)=>setEmail(e.target.value)}/>
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
