import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavLink,
  Button,
  Form,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Navigation() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Función para detectar el cambio de tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <>

<Navbar bg="primary" expand="lg" className="m-0 ps-2 pe-2 pt-0 pb-0">
  <Navbar.Brand href="#home" className="text-white">
    <img
      alt="Logo"
      src="/logo256.png"
      width="50"
      height="50"
      className="d-inline-block align-center"
    />{" "}
    D&P
  </Navbar.Brand>

  {/* Mostrar el sidebar only when with is less than 500px */}
  {windowWidth < 900 ? (
    <>
      <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
      <Offcanvas show={showOffcanvas} onHide={handleToggle} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Opciones</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">Sign Up</Nav.Link>
            <Nav.Link href="#action2">Log In</Nav.Link>
            <Nav.Link href="#action3">Dropdown</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
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

      {/* Este Toggle es redundante, así que lo removemos */}
      <FaShoppingCart
        className="ms-auto me-2 color-white"
        style={{ width: "30px", height: "30px" }}
      />
      <Link
        class="btn bg-secondary text-white rounded-pill ms-1 me-1 d-flex justify-content-center align-items-center"
        style={{ whiteSpace: "nowrap" }}
      >
        Sign Up
      </Link>
      <Link
        as={Link}
        to="/home"
        class="btn bg-secondary text-white rounded-pill ms-1 me-1 d-flex justify-content-center align-items-center"
        style={{ whiteSpace: "nowrap" }}
      >
        Log In
      </Link>
    </>
  )}
</Navbar>

    </>
  );
}
