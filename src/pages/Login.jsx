import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NotificationContext } from "../context/NotificationContext";
import { UserProfileContext } from "../context/UserProfileContext";
import axios from "axios";

function Login({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const { notifications, setNotifications } = useContext(NotificationContext);

  const localIp = process.env.REACT_APP_LOCAL_IP;

  let temp = userProfile;
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        showNotification: true,
        type: "loading",
      },
    ]);

    try {
      const response = await axios.post(
        `http://${localIp}/proyectodbaw/phpsql/login.php`,
        {
          email: temp.email.trim(),
          password: password,
        }
      );
      if (response.data.status === "success") {
        temp.active = parseInt(response.data.active);
        if (temp.active === 1) {
          temp.email = response.data.email;
          temp.rol = parseInt(response.data.rol);
          temp.firstName = response.data.firstname;
          temp.lastName = response.data.lastname;
          temp.birthDate = response.data.birthdate;
          temp.address = response.data.address;
          temp.cardNumber = response.data.cardnumber;
          temp.expireDate = response.data.expiredate;
          temp.phoneNumber = response.data.phonenumber;
          temp.lastConection = response.data.lastconnection;
          temp.userId = parseInt(response.data.userid);
          temp.password = response.data.password;
          console.log("Logueado", response.data.rol);
          setValidated(true);
          setShow(false);
          setUserProfile(temp);
      
          setNotifications((prevNotifications) => [
            ...prevNotifications.slice(0,-1),
            {
              showNotification: true,
              type: "success",
              headerMessage: "Success",
              bodyMessage: "Login Successful",
            },
          ]);
        } else {
          console.log("Usuario inactivo o no confirmado");
          localStorage.clear();
          setNotifications((prevNotifications) => [
            ...prevNotifications.slice(0, -1),
            {
              showNotification: true,
              type: "error",
              headerMessage: "Error",
              bodyMessage: "User inactive or not confirmed",
            },
          ]);
        }
      } else {
        console.log("no logueado");
        console.log(response);
        localStorage.clear();
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "Username or password are not correct",
          },
        ]);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
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
              <Form.Control
                required
                placeholder="example@gmail.com"
                type="text"
                onChange={(e) => {
                  let temp = userProfile;
                  temp.email = e.target.value;
                  setUserProfile(temp);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validatePassword">
              <Form.Label className="text-success">Password</Form.Label>
              <Form.Control
                required
                placeholder="Password#123"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
    </>
  );
}

export default Login;
