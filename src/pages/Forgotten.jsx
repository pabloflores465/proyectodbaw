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

function Forgotten() {
    const params = useParams()
    const { userProfile } = useContext(UserProfileContext);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("")
    const [tokens, setTokens] = useState([]);
    const localIp = process.env.REACT_APP_LOCAL_IP;
    const { notifications, setNotifications } = useContext(NotificationContext);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          showNotification: true,
          type: "loading",
        },
      ]);
      if(password === confirmpass){
        if (used === 0){
      try {
        const response = await axios.put(
          `http://${localIp}/proyectodbaw/phpsql/forgot.php?id_user=${iduser}&password=${password}&token=${params.resettoken}`,
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
}else{
  setNotifications((prevNotifications) => [
    ...prevNotifications.slice(0, -1),
    {
      showNotification: true,
      type: "error",
      headerMessage: "Error",
      bodyMessage: "Password already changed",
    },
  ]);
}
}else{
  console.log("Passwords doesn't match")
  setNotifications((prevNotifications) => [
    ...prevNotifications.slice(0, -1),
    {
      showNotification: true,
      type: "error",
      headerMessage: "Error",
      bodyMessage: "Passwords doesn't match",
    },
  ]);
}
};

    useEffect(() => {
      axios.get(`http://${localIp}/proyectodbaw/phpsql/forgot.php`)
        .then(response => {
          setTokens(response.data);
        })
        .catch(error => {
          console.error("Hubo un error al obtener los tokens:", error);
        });
        
    }, []);
    const tokenOb = tokens.find(t => t.token === params.resettoken);
    const used = tokenOb ? parseInt(tokenOb.used, 10) : null;
    const iduser = tokenOb ? parseInt(tokenOb.id_user) : null;

  return (
    <>
    {console.log(tokens, params, iduser)}
    {tokens.some(tokenObj => tokenObj.token === params.resettoken) && used === 0  ? (
      <>
    <div className='bg-image d-flex align-items-center justify-content-center full-height'>
    <Card style={{ width: 'auto', border: 'none' }} className='m-auto shadow'>
    <Card.Title className='d-flex justify-content-center bg-primary rounded-top text-white py-2'>Change Password</Card.Title>
      <Card.Body>
        <Card.Img variant="center" src="/hiCat.webp" width='400px' height='250px' />
        <Form
            onSubmit={handleSubmit}
            className="ps-1 pe-1 overflow-auto"
          >
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-success">New Password</Form.Label>
              <Form.Control
                required
                placeholder="Password#123"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text>Forgot Password?</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmpass">
              <Form.Label className="text-success">Confirm new password</Form.Label>
              <Form.Control
                required
                placeholder="Password#123"
                type="password"
                onChange={(e) => setConfirmpass(e.target.value)}
              />
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
   ) : (<ErrorPage/>)}
    
    </>
  )
}

export default Forgotten