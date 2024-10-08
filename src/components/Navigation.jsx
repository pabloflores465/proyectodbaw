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
import { CgUserList } from "react-icons/cg";
import {
  EditProductContext,
  NotificationContext,
  UserProfileContext,
  WindowWidthContext,
} from "../App";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import NewUserAdmin from "../pages/NewUserAdmin";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "./Search";
import Cart from "./Cart";
import { IoLogIn } from "react-icons/io5";
import UsersList from "../pages/UsersList";

let Desktop;
let Mobile;

export default function Navigation() {
  const { userProfile, setUserProfile, guestProfile } =
    useContext(UserProfileContext);
  const { windowWidth } = useContext(WindowWidthContext);
  const { editProduct, setEditProduct } = useContext(EditProductContext);
  const { setNotifications } = useContext(NotificationContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNewUserAdmin, setShowNewUserAdmin] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
        style={{ position: "fixed", top: 0, zIndex: 999 }}
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
        {windowWidth > 1000 ? (
          <Desktop
            userProfile={userProfile}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setShowProfile={setShowProfile}
            setShowUsersList={setShowUsersList}
            setShowNewUserAdmin={setShowNewUserAdmin}
            guestProfile={guestProfile}
            setUserProfile={setUserProfile}
            setNotifications={setNotifications}
            showOffcanvas={showOffcanvas}
          />
        ) : (
          <Mobile
            userProfile={userProfile}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setShowProfile={setShowProfile}
            setShowUsersList={setShowUsersList}
            setShowNewUserAdmin={setShowNewUserAdmin}
            guestProfile={guestProfile}
            setUserProfile={setUserProfile}
            setNotifications={setNotifications}
            showOffcanvas={showOffcanvas}
            handleToggle={handleToggle}
          />
        )}
      </Navbar>

      <Login show={showLogin} setShow={setShowLogin} />
      <NewUserAdmin show={showNewUserAdmin} setShow={setShowNewUserAdmin} />
      <Signup show={showSignup} setShow={setShowSignup} />
      <Profile show={showProfile} setShow={setShowProfile} />
      <UsersList show={showUsersList} setShow={setShowUsersList} />
    </>
  );
}

Desktop = ({
  userProfile,
  editProduct,
  setEditProduct,
  setShowSignup,
  setShowLogin,
  setShowProfile,
  setShowUsersList,
  setShowNewUserAdmin,
  guestProfile,
  setUserProfile,
  setNotifications,
  showOffcanvas,
}) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 m-auto">
        <Search />
      </div>

      {editProduct === false && userProfile.rol !== 0 ? (
        <div className="d-flex flex-row justify-content-center align-items-center text-white">
          <Cart showOffcanvas={showOffcanvas} />
        </div>
      ) : null}

      {userProfile.rol === 3 || userProfile.rol === 2 ? (
        <>
          <div className="text-white" style={{ whiteSpace: "nowrap" }}>
            Edit Products
          </div>
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

      {userProfile.rol === 0 ? (
        <>
          <Button
            onClick={() => setShowSignup(true)}
            className="bg-secondary text-white me-2 w-auto rounded-pill d-flex justify-content-center align-items-center"
            style={{ whiteSpace: "nowrap" }}
          >
            <IoMdPersonAdd className="me-1" /> Sign Up
          </Button>
          <Button
            onClick={() => setShowLogin(true)}
            className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center"
            style={{ whiteSpace: "nowrap" }}
          >
            <IoLogIn className="me-1" /> Log In
          </Button>
        </>
      ) : (
        <>
          <Dropdown>
            <Dropdown.Toggle className="text-white">
              {userProfile.firstName} {userProfile.lastName}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: "auto" }}>
              <div className="container">
                {userProfile.rol === 3 ? (
                  <Dropdown.Item className="d-flex align-items-center border-bottom mb-2 text-success">
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
                  <Dropdown.Item className="d-flex align-items-center border-bottom mb-2 text-success">
                    <Button
                      onClick={() => setShowNewUserAdmin(true)}
                      variant="link"
                      className="m-0 p-0 text-success"
                    >
                      <FaArrowsDownToPeople /> Add User
                    </Button>
                  </Dropdown.Item>
                ) : null}
                <Dropdown.Item className="d-flex align-items-center border-bottom mb-2 text-success">
                  <Button
                    onClick={() => setShowProfile(true)}
                    variant="link"
                    className="m-0 p-0 text-success"
                  >
                    <IoMdPersonAdd /> Profile
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center mb-2 text-success">
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
  );
};

Mobile = ({
  userProfile,
  editProduct,
  setEditProduct,
  setShowSignup,
  setShowLogin,
  setShowProfile,
  setShowUsersList,
  setShowNewUserAdmin,
  guestProfile,
  setUserProfile,
  setNotifications,
  showOffcanvas,
  handleToggle,
}) => {
  return (
    <>
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

            {editProduct === false && userProfile.rol !== 0 ? (
              <Cart showOffcanvas={showOffcanvas} />
            ) : null}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
