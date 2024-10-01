import React, { useContext, useState } from "react";
import {
  Button,
  Dropdown,
  FormCheck,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { RiLogoutBoxFill } from "react-icons/ri";
import {
  EditProductContext,
  RolContext,
  UserNameContext,
  WindowWidthContext,
} from "../App";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "./Search";
import Cart from "./Cart";

export default function Navigation() {
  const { userName } = useContext(UserNameContext);
  const { userType } = useContext(UserNameContext);
  const { setUserType } = useContext(UserNameContext);
  const { windowWidth } = useContext(WindowWidthContext);
  const { editProduct, setEditProduct } = useContext(EditProductContext);
  const {rol, setRol } = useContext(RolContext)
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
        style={{position:"fixed", top: 0, zIndex:999}}
      >
        <Navbar.Brand href="/" className="text-white">
          <img
            alt="Logo"
            src="/logo512.png"
            width="50"
            height="50"
            className="d-inline-block align-center"
          />{" "}
          D&P Petshop
        </Navbar.Brand>
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
                <div>
                  <Search />
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center w-100 m-auto">
              <Search />
            </div>

            {editProduct === false ? (
              <div className="d-flex flex-row justify-content-center align-items-center text-white">
                <Cart />
              </div>
            ) : null}

            {rol === 3 || rol === 2 ? (
              <>
                <div className="text-white" style={{ whiteSpace: "nowrap" }}>Edit Products</div>
                <FormCheck
                  type="switch"
                  style={{ whiteSpace: "nowrap" }}
                  checked={editProduct}
                  onChange={() => setEditProduct(!editProduct)}
                  isValid
                  reverse
                  className="me-1"
                />
              </>
            ) : null}

            {rol === 0 ? (
              <>
                <Button
                  onClick={() => setShowSignup(true)}
                  className="bg-secondary text-white me-2 w-auto rounded-pill d-flex justify-content-center align-items-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => setShowLogin(true)}
                  className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center"
                  style={{ whiteSpace: "nowrap" }}
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
                    {rol === 3 ? (
                      <Dropdown.Item className="text-success">
                        <FaArrowsDownToPeople /> Users
                      </Dropdown.Item>
                    ) : null}
                    <Dropdown.Item>
                      <Button
                        onClick={() => setShowProfile(true)}
                        variant="link"
                        className="m-0 p-0 text-success"
                      >
                        <IoMdPersonAdd /> Profile
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        onClick={() => {
                            setRol(0)
                            setEditProduct(false)

                        }}
                        variant="link"
                        className="m-0 p-0 text-success"
                      >
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

      <Login show={showLogin} setShow={setShowLogin} />
      <Signup show={showSignup} setShow={setShowSignup} />
      <Profile show={showProfile} setShow={setShowProfile} />
    </>
  );
}
