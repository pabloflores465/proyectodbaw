import React, { useContext, useState, useEffect, useRef } from "react";

import {
  Button,
  Dropdown,
  Form,
  FormCheck,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "../components/Search";
import Cart from "../components/Cart";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";
import { EditModeContext } from "../context/EditModeContext";
import { NotificationContext } from "../context/NotificationContext";
import { FaFile } from "react-icons/fa";
import getCategories from "../conections/getCategories";

export default function NavigationMobile({
  setShowSignup,
  setShowLogin,
  setShowProfile,
}) {
  const { userProfile, setUserProfile, guestProfile } =
    useContext(UserProfileContext);
  const { editMode, setEditMode } = useContext(EditModeContext);
  const { setNotifications } = useContext(NotificationContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    const nav = document.getElementById("navbarMobile");

    if (nav) {
      const rect = nav.getBoundingClientRect();

      if (rect.left === 0 && rect.top === 0) {
        nav.style.height = "120px";
      }
    }
  }, []);

  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  let guest = userProfile.rol === 0 ? true : false;
  let employee = userProfile.rol === 2 ? true : false;
  let admin = userProfile.rol === 3 ? true : false;

  return (
    <div id="navbarMobile">
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
        style={{ position: "fixed", top: 0, zIndex: 1000, height: 120 }}
      >
        {employee || (admin && editMode) ? (
          <Form className="d-flex align-items-center text-white">
            <div className="d-flex align-items-center"></div>
            <Button
              onClick={handleButtonClick}
              style={{ whiteSpace: "nowrap" }}
              variant="link"
              className="text-white my-2"
            >
              <FaFile size={"1.7rem"} />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Form.Group className="d-flex align-items-center text-white">
              <Form.Control
                required
                type="text"
                placeholder="D&P Petshop"
                defaultValue="Mark"
                className="my-2"
                style={{ width: "100px" }}
              />
            </Form.Group>
          </Form>
        ) : (
          <Navbar.Brand as={Link} to="/" className="text-white me-0">
            <img
              alt="Logo"
              src={fileName}
              width="50"
              height="50"
              className="d-inline-block align-center"
            />{" "}
            D&P Petshop
          </Navbar.Brand>
        )}
        <div className="d-flex flex-row text-white">
          {admin || employee ? (
            <div className="d-flex ms-2 align-items-center">
              <div>Edit Mode</div>
              <FormCheck
                type="switch"
                style={{ whiteSpace: "nowrap" }}
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
                isValid
                reverse
                className="me-1 ms-auto"
              />
            </div>
          ) : null}
        </div>
        <Navbar.Toggle
          className="bg-primary text-white custom"
          aria-controls="offcanvasNavbar"
          onClick={handleToggle}
          style={{ color: "white", borderColor: "white" }}
        >
          <GiHamburgerMenu />
        </Navbar.Toggle>
        <div className="w-100 mb-2 d-flex fle-row align-items-center">
          {editMode === false && guest ? <Cart /> : null}
          <Search />
        </div>
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
              {guest ? (
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
                              variant="link"
                              as={Link}
                              to="/UserList"
                              className="m-0 p-0 text-success"
                            >
                              <CgUserList /> Users List
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
                              setEditMode(false);
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

              {categories.map((element, index) => (
                <div
                  key={index}
                  className="d-flex w-100 mt-2 justify-content-center"
                >
                  <Dropdown className="border-bottom">
                    <Dropdown.Toggle
                      variant="link"
                      className="text-black"
                    ></Dropdown.Toggle>
                    <Link
                      key={element.name}
                      to={`/categories/${element.name}`}
                      className="text-black"
                      style={{ textDecoration: "none" }}
                    >
                      <strong className="ms-1 me-1">{element.name}</strong>
                    </Link>
                    <Dropdown.Menu className="mb-2">
                      <div className="container">
                        {categories
                          .filter((category) => category.name !== element.name)
                          .map((filteredCategory, index2) => (
                            <div
                              key={index2}
                              className={`d-flex justify-content-center align-items-center ${
                                index2 === categories.length - 1
                                  ? ""
                                  : "border-bottom"
                              } mb-2`}
                            >
                              <Link
                                key={filteredCategory.name}
                                to={`/categories/${element.name}/${filteredCategory.name}`}
                                className="text-black"
                                style={{ textDecoration: "none" }}
                              >
                                {filteredCategory.name}
                              </Link>
                              <Link
                                to={`/categories/${element.name}/${filteredCategory.name}`}
                              ></Link>
                            </div>
                          ))}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    </div>
  );
}
