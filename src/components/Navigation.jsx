import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Nav,
  Navbar,
  Button,
  Form,
  Offcanvas,
  Dropdown,
  OverlayTrigger,
  Card,
  Row, 
  Col,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { FaFacebook, FaInstagram, FaPhone, FaSearch, FaShoppingCart, FaTiktok, FaWhatsapp, FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserNameContext } from "../App";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { MdEmail, MdPets } from "react-icons/md";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { IoCloseSharp } from "react-icons/io5";

export default function Navigation() {
  const { userName } = useContext(UserNameContext);
  const { setUserName } = useContext(UserNameContext);
  const { userType } = useContext(UserNameContext);
  const { setUserType } = useContext(UserNameContext);
  setUserName("Pablo Flores");
  //setUserType("Admin");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Function to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener by rezising the component
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [showProducts, setShowProducts] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow"
      >
        <Navbar.Brand href="/home" className="text-white">
          <img
            alt="Logo"
            src="/logo512.png"
            width="50"
            height="50"
            className="d-inline-block align-center"
          />{" "}
          D&P Petshop
        </Navbar.Brand>

        {/* Show sidebar only when with is less than 500px */}
        {windowWidth < 1000 ? (
          <>
            <Navbar.Toggle
              className="bg-primary text-white custom"
              aria-controls="offcanvasNavbar"
              onClick={handleToggle}
              style={{ color: "white", borderColor: "white" }}
            >
              <GiHamburgerMenu />
            </Navbar.Toggle>
            <Offcanvas
              show={showOffcanvas}
              onHide={handleToggle}
              placement="end"
            >
              <Offcanvas.Header className="bg-primary text-white" closeButton>
                <Offcanvas.Title>D&P</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Sign Up</Nav.Link>
                  <Nav.Link href="#action2">Log In</Nav.Link>
                  <Nav.Link href="#action3">Dropdown</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    placeholder="Buscar Productos"
                    className="d-flex ms-auto me-1 rounded-pill"
                  />
                  <Button className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center">
                    <FaSearch className="me-1" /> Search
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          <>
            <Form.Control
              placeholder="Buscar Productos"
              className="d-flex ms-auto me-1 rounded-pill"
              style={{ maxWidth: "50%" }}
            />
            <Button className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center">
              <FaSearch className="me-1" /> Search
            </Button>

            <OverlayTrigger
              placement="bottom"
              overlay={
                <Card
                  bg="secondary"
                  className="text-white ps-0 pe-0"
                  style={{maxWidth:"350px"}}
                >
                  <Card.Header>Products</Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-center align-items-center p-0 m-0">
                      <p className="pe-2" style={{maxWidth:"80%"}}>
                        ohoiahkjfhssdajkjadoadjkfahkjfhssdajkjadoadjkfahkjfhssdajkjadoadjkfa
                      </p>
                      
                        <Button variant = "link" className="text-white"><IoCloseSharp size={"1.5rem"}/></Button>
                    </div>
                  </Card.Body>
                </Card>
              }
              trigger="click"
            >
              <Button
                ref={target}
                onClick={() => setShowProducts(!showProducts)}
                className="ms-auto me-1 text-white"
              >
                <FaShoppingCart size={"2rem"} />
              </Button>
            </OverlayTrigger>
            {userType === "Guest" ? (
              <>
                <Button
                  onClick={() => setShowSignup(true)}
                  className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => setShowLogin(true)}
                  className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center"
                >
                  Log In
                </Button>
              </>
            ) : (
              <>
                <Dropdown>
                  <Dropdown.Toggle className="text-white">
                    {userName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: "auto" }}>
                    {userType === "Admin" ? (
                      <Dropdown.Item className="text-success">
                        <FaArrowsDownToPeople /> Users
                      </Dropdown.Item>
                    ) : null}
                    {userType === "Employee" || userType === "Admin" ? (
                      <Dropdown.Item className="text-success">
                        <MdPets /> Products
                      </Dropdown.Item>
                    ) : null}
                    <Dropdown.Item href="#action/3.1" className="text-success">
                      <IoMdPersonAdd /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item  className="text-success">
                      <Button onClick={()=>setUserType('Guest')} variant="link">
                        <RiLogoutBoxFill /> Log Out
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <img
                  alt="Logo"
                  src="/logo512.png"
                  width="50"
                  height="50"
                  className="d-inline-block align-center"
                />
              </>
            )}
          </>
        )}
      </Navbar>
      <Outlet />

      <Login show={showLogin} setShow={setShowLogin} />
      <Signup show={showSignup} setShow={setShowSignup} />

      {windowWidth > 800 ? (<Card className="bg-primary w-100 text-white text-center rounded-0 shadow" style={{position:'fixed', bottom:'0'}}>
        <Row>
          <Col><strong>About D&P Petshop</strong></Col>
          <Col><strong>Social Media</strong></Col>
          <Col><strong>Contact Us</strong></Col>
          <Col><strong>About</strong></Col>

        </Row>
        <Row>
          <Col>¿Who are We?</Col>
          <Col><FaFacebook/> Facebook</Col>
          <Col><FaWhatsapp/> Whatsapp</Col>
          <Col>Privacy Policy</Col>
        </Row>
        <Row>
          <Col>Mision</Col>
          <Col><FaInstagram/> Instagram</Col>
          <Col><FaPhone/> +502 1234-4321</Col>
          <Col>Devs: Pablo Flores & Nohel Estrada</Col>
        </Row>
        <Row>
          <Col>Vision</Col>
          <Col><FaTiktok/> Tik Tok</Col>
          <Col><MdEmail/> example@gmail.com</Col>
          <Col>License: GPLV3</Col> 
        </Row>
      </Card>):(<Card className="bg-primary w-100 text-white text-center rounded-0 shadow" style={{position:'fixed', bottom:'0'}}>
        <Row>
          <Col><strong>About D&P Petshop</strong></Col>
        </Row>
        <Row>
          <Col>¿Who are We?</Col>
        </Row>
        <Row>
          <Col>Mision</Col>
        </Row>
        <Row>
          <Col>Vision</Col>
        </Row>
        <Row>
          <Col><strong>Social Media</strong></Col>
        </Row>
        <Row>
          <Col><FaFacebook/> Facebook</Col>
        </Row>
        <Row>
          <Col><FaInstagram/> Instagram</Col>
        </Row>
        <Row>
          <Col><FaTiktok/> Tik Tok</Col>
        </Row>
        <Row>
          <Col><strong>Contact Us</strong></Col>
        </Row>
        <Row>
          <Col><FaWhatsapp/> Whatsapp</Col>
        </Row>
        <Row>
          <Col><FaPhone/> +502 1234-4321</Col>
        </Row>
        <Row>
          <Col><MdEmail/> example@gmail.com</Col>
        </Row>
        <Row>
          <Col><strong>About</strong></Col>
        </Row>
        <Row>
          <Col>Privacy Policy</Col>
        </Row>
        <Row>
          <Col>Devs: Pablo Flores & Nohel Estrada</Col>
        </Row>
        <Row>
          <Col>License: GPLV3</Col> 
        </Row>
      </Card>
        
      ) }
    </>
  );
}
