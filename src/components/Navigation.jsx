import React, { useContext, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  Button,
  Form,
  Offcanvas,
  NavDropdown,
  Card,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserNameContext } from "../App";
import { DiRackspace } from "react-icons/di";

export default function Navigation() {
  const { userName } = useContext(UserNameContext);
  const { setUserName } = useContext(UserNameContext);
  const { userType } = useContext(UserNameContext);
  const { setUserType } = useContext(UserNameContext);
  setUserName("Pablo Flores");
  setUserType("Admin");
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
            <FaShoppingCart size={"2rem"} className="ms-auto me-3 text-white" />
            {userType === "Guest" ? (
              <>
                <Link
                  class="btn bg-secondary text-white rounded-pill ms-1 me-1 d-flex justify-content-center align-items-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Sign Up
                </Link>
                <Link
                  as={Link}
                  to="/login"
                  class="btn bg-secondary text-white rounded-pill ms-1 me-1 d-flex justify-content-center align-items-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Dropdown>
                  <Dropdown.Toggle className="text-white">
                    {userName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ minWidth: "auto" }}
                  >
                    <Dropdown.Item href="#action/3.1" className="text-success">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#action/3.1" className="text-success">
                      Log Out
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
    </>
  );
}
