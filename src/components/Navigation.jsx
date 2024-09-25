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
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserNameContext } from "../App";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPets } from "react-icons/md";
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
  setUserType("Guest");
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
                    <Dropdown.Item href="#action/3.1" className="text-success">
                      <RiLogoutBoxFill /> Log Out
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
      <div className="bg-primary w-100 text-white text-center">
        <p>About Us</p>
      </div>
      <Login show={showLogin} setShow={setShowLogin} />
      <Signup show={showSignup} setShow={setShowSignup} />

      <footer>
        about us
      </footer>
    </>
  );
}
