import React, { useContext, useState } from "react";

import {
  EditProductContext,
  NotificationContext,
  UserProfileContext,
} from "../App";

import {
  Button,
  Dropdown,
  FormCheck,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "../components/Search";
import Cart from "../components/Cart";
import { IoLogIn } from "react-icons/io5";

export default function NavigationMobile({
  setShowSignup,
  setShowLogin,
  setShowProfile,
  setShowUsersList,
  setShowNewUserAdmin,
}) {
  const { userProfile, setUserProfile, guestProfile } =
    useContext(UserProfileContext);
  const { editProduct, setEditProduct } = useContext(EditProductContext);
  const { setNotifications } = useContext(NotificationContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);
  return (
    <Navbar
    bg="primary"
    expand="lg"
    className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
    style={{ position: "fixed", top: 0, zIndex: 1000 }}
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
      <Navbar.Toggle
        className="bg-primary text-white custom"
        aria-controls="offcanvasNavbar"
        onClick={handleToggle}
        style={{ color: "white", borderColor: "white" }}
      >
        <GiHamburgerMenu />
      </Navbar.Toggle>
      <Offcanvas show={showOffcanvas} onHide={handleToggle} placement="end">
        <Offcanvas.Header
          className="bg-primary text-white pb-0 pt-0"
          closeButton
        >
          <Offcanvas.Title>
            <img
              alt="Logo"
              src="/logo512.png"
              width="50"
              height="50"
              className="d-inline-block align-center"
            />
            D&P
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {userProfile.rol === 0 ? (
              <>
                <Button
                  onClick={() => setShowSignup(true)}
                  className="bg-secondary text-white me-2 w-auto rounded-pill d-flex justify-content-center align-items-center mb-2"
                  style={{ whiteSpace: "nowrap", border: "none" }}
                >
                  <IoMdPersonAdd className="me-1" /> Sign Up
                </Button>
                <Button
                  onClick={() => setShowLogin(true)}
                  className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center border-none mb-2"
                  style={{ whiteSpace: "nowrap", border: "none" }}
                >
                  <IoLogIn className="me-1" /> Log In
                </Button>
              </>
            ) : (
              <div className="d-flex flex-row align-items-center mb-2">
                <Dropdown className="w-100">
                  <Dropdown.Toggle
                    variant="link"
                    className="d-flex flex-row w-100 align-items-center"
                  >
                    <div className="d-flex flex-row ">
                      {userProfile.firstName} {userProfile.lastName}
                    </div>
                    <img
                      alt="Logo"
                      src="/logo512.png"
                      width="50"
                      height="50"
                      className="d-inline-block align-center ms-auto"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <div className="container">
                      {userProfile.rol === 3 ? (
                        <Dropdown.Item
                          className="text-success"
                          style={{ textAlign: "center" }}
                        >
                          <Button
                            onClick={() => setShowUsersList(true)}
                            variant="link"
                            className="m-0 p-0 text-success"
                          >
                            <CgUserList /> Users List
                          </Button>
                        </Dropdown.Item>
                      ) : null}
                      {userProfile.rol === 3 ? (
                        <Dropdown.Item
                          className="text-success border-top"
                          style={{ textAlign: "center" }}
                        >
                          <Button
                            onClick={() => setShowNewUserAdmin(true)}
                            variant="link"
                            className="m-0 p-0 text-success"
                          >
                            <FaArrowsDownToPeople /> Add User
                          </Button>
                        </Dropdown.Item>
                      ) : null}
                      <Dropdown.Item
                        className="border-top"
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          onClick={() => setShowProfile(true)}
                          variant="link"
                          className="m-0 p-0 text-success"
                        >
                          <IoMdPersonAdd /> Profile
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="border-top"
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          onClick={() => {
                            localStorage.clear();
                            setUserProfile(guestProfile);
                            setEditProduct(false);
                            setNotifications((prevNotifications) => [
                              ...prevNotifications,
                              {
                                showNotification: true,
                                type: "success",
                                headerMessage: "Success",
                                bodyMessage: "Logout Successful",
                              },
                            ]);
                          }}
                          variant="link"
                          className="m-0 p-0 text-success"
                        >
                          <RiLogoutBoxFill /> Log Out
                        </Button>
                      </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

            {userProfile.rol === 3 || userProfile.rol === 2 ? (
              <div className="d-flex flex-row mb-2">
                <div>Edit Products</div>
                <FormCheck
                  type="switch"
                  style={{ whiteSpace: "nowrap" }}
                  checked={editProduct}
                  onChange={() => setEditProduct(!editProduct)}
                  isValid
                  reverse
                  className="me-1 ms-auto"
                />
              </div>
            ) : null}

            <div className="mb-2">
              <Search />
            </div>

            {editProduct === false && userProfile.rol !== 0 ? <Cart /> : null}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
