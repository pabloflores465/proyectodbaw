import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router'
import {Form} from "react-bootstrap";
import AboutUS from '../components/AboutUs'
import "../customStyles/LoginComfirm.css"
import { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import LoadingState from '../components/LoadingState'
import ErrorPage from './ErrorPage'
import { NotificationContext } from "../context/NotificationContext";
import axios from 'axios'

function LoginComfirm() {
    const params = useParams()
    const { userProfile } = useContext(UserProfileContext);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [tokens, setTokens] = useState([]);
    const localIp = process.env.REACT_APP_LOCAL_IP;
    const { notifications, setNotifications } = useContext(NotificationContext);

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(email, password, params.token)
      try {
        const response = await axios.post(
          `http://${localIp}/proyectodbaw/phpsql/loginconfirm.php`,
          {
            email: email.trim(),
            password: password,
            token : params.token,
          }
        );
        console.log(response.data)
        if (response.data.status === "success") {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0,-1),
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "User confirmated",
          },
        ]);
      } if (response.data.status === "already") {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0,-1),
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "User already confirmated",
          },
        ]);
      }else {
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

    useEffect(() => {
      axios.get(`http://${localIp}/proyectodbaw/phpsql/confirm.php`)
        .then(response => {
          setTokens(response.data);
        })
        .catch(error => {
          console.error("Hubo un error al obtener los tokens:", error);
        });
    }, []);

  return (
    <>
    {console.log(tokens)}
    {tokens.some(tokenObj => tokenObj.token === params.token) ? (
      <>
    <div className='bg-image d-flex align-items-center justify-content-center full-height'>
    <Card style={{ width: 'auto', border: 'none' }} className='m-auto shadow'>
    <Card.Title className='d-flex justify-content-center bg-primary rounded-top text-white py-2'>Comfirm Login</Card.Title>
      <Card.Body>
        <Card.Img variant="center" src="/hiCat.webp" width='400px' height='250px' />
        <Card.Text className='my-2 d-flex align-text-center'>
            <strong>Hi, Please confirm that you want to login.</strong>
        </Card.Text>
        <Form
            onSubmit={handleSubmit}
            className="ps-1 pe-1 overflow-auto"
          >
            <Form.Group className="mb-3" controlId="validateUserName">
              <Form.Label className="text-success">E-mail</Form.Label>
              <Form.Control
                required
                placeholder="example@gmail.com"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
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
            >
              Submit
            </Button>
          </Form>
      </Card.Body>
    </Card>
    </div>
    <AboutUS/>
    </>
    ) : (<ErrorPage/>)
    }
    </>
  )
}

export default LoginComfirm