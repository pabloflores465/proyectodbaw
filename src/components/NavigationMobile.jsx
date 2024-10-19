import React, { useContext, useState, useEffect, useRef } from "react";

import {
  Button,
  Form,
  FormCheck,
  Navbar,
} from "react-bootstrap";

import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../components/Search";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";
import { EditModeContext } from "../context/EditModeContext";
import { NotificationContext } from "../context/NotificationContext";
import { FaFile } from "react-icons/fa";
import getCategories from "../conections/getCategories";
import AllCategories from "../pages/AllCategories";
export default function NavigationMobile() {
  const { userProfile, setUserProfile, guestProfile } =
    useContext(UserProfileContext);
  const { editMode, setEditMode } = useContext(EditModeContext);
  const { setNotifications } = useContext(NotificationContext);
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const handleToggle = () => setShowOffCanvas(!showOffCanvas);
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
    <>
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
      </Navbar>
    </div>
    <AllCategories showOffCanvas={showOffCanvas} setShowOffCanvas={setShowOffCanvas} mobile={true}/>
    </>
  );
}
