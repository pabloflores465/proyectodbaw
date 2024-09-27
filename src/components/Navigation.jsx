import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Image,
  Nav,
  Navbar,
  Offcanvas,
  OverlayTrigger,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { UserNameContext, WindowWidthContext } from "../App";
import { MdPets } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "./Search";

export default function Navigation() {
  const { userName } = useContext(UserNameContext);
  const { userType } = useContext(UserNameContext);
  const { setUserType } = useContext(UserNameContext);
  const { windowWidth } = useContext(WindowWidthContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showProducts, setShowProducts] = useState(false);

  const target = useRef(null);

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow"
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
                    <Search/>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center w-100 m-auto">
                <Search/>
            </div>

            <OverlayTrigger
              placement="bottom"
              overlay={
                <Card
                  bg="secondary"
                  className="text-white ps-0 pe-0"
                  style={{ maxWidth: "350px" }}
                >
                  <Card.Header>Products</Card.Header>
                  <Card.Body className="p-0">
                    <div className="d-flex justify-content-center rounded-bottom bg-white align-items-center">
                      <Image src="/hola.png" rounded height={80} width={80} />
                      <p
                        className="pe-2 ms-3 text-black"
                        style={{ maxWidth: "55%" }}
                      >
                        <strong>title</strong>
                        <br />
                        ohoiahkjfhssdajkjadoadjkfahkjfhssdajkjadoadjkfahkjfhssdajkjadoadjkfa
                        <br />
                        <strong>$.100.00</strong>
                      </p>

                      <Button variant="link">
                        <IoCloseSharp size={"1.5rem"} />
                      </Button>
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
                        onClick={() => setUserType("Guest")}
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
