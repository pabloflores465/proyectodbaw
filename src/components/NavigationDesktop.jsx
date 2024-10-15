import React, { useContext, useState, useEffect, useRef } from "react";

import {
  Button,
  Collapse,
  Dropdown,
  Form,
  FormCheck,
  Navbar,
} from "react-bootstrap";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";

import { FaArrowsDownToPeople, FaFile } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "../components/Search";
import Cart from "../components/Cart";
import { IoLogIn } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";
import { EditModeContext } from "../context/EditModeContext";
import { NotificationContext } from "../context/NotificationContext";
import { BiSolidCategoryAlt } from "react-icons/bi";
import getCategories from "../conections/getCategories";

export default function NavigationDesktop({
  setShowSignup,
  setShowLogin,
  setShowProfile,
  setShowUsersList,
  setShowNewUserAdmin,
}) {
  const { userProfile, setUserProfile, guestProfile} =
    useContext(UserProfileContext);
  const { editMode, setEditMode } = useContext(EditModeContext);
  const { setNotifications } = useContext(NotificationContext);

  const [showCategories, setShowCategories] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  function handleLogOut() {
    setEditMode(false);
    setUserProfile(guestProfile);

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        showNotification: true,
        type: "success",
        headerMessage: "Success",
        bodyMessage: "LogOut Successful",
      },
    ]);
  }

  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  let guest = userProfile.rol === 0 ? true:false
  let client = userProfile.rol === 1 ? true:false
  let employee = userProfile.rol === 2 ? true:false 
  let admin = userProfile.rol === 3 ? true:false

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
        style={{ position: "fixed", top: 0, zIndex: 1000 }}
      >
        {employee || (admin && editMode) ? (
          <Form className="d-flex align-items-center text-white">
            <div className="d-flex align-items-center"></div>
            <Button
              onClick={handleButtonClick}
              style={{ whiteSpace: "nowrap" }}
              variant="link"
              className="text-white my-2 me-2"
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
                style={{ width: "150px" }}
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
        <Button
          className="text-white rounded-pill d-flex justify-content-center align-items-center"
          onClick={() => setShowCategories(!showCategories)}
        >
          <MdMenu size={"2rem"} />
        </Button>
        <div className="d-flex justify-content-center align-items-center w-100 m-auto">
          <Search />
        </div>

        {!editMode || guest ? (
          <div className="d-flex flex-row justify-content-center align-items-center text-white">
            <Cart />
          </div>
        ) : null}

        {employee || admin ? (
          <>
            <div className="text-white" style={{ whiteSpace: "nowrap" }}>
              Edit Mode
            </div>
            <FormCheck
              type="switch"
              style={{ whiteSpace: "nowrap" }}
              checked={editMode}
              onChange={() => setEditMode(!editMode)}
              isValid
              reverse
              className="me-1"
            />
          </>
        ) : null}

        {guest ? (
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
                  {admin ? (
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
                  {admin || employee ? (
                    <Dropdown.Item className="d-flex align-items-center mb-2 text-success border-bottom">
                      <Button
                        variant="link"
                        className=" m-0 p-0 text-success"
                        as={Link}
                        to="/categories/edit"
                      >
                        <BiSolidCategoryAlt className="me-1" /> Categories
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
                    {console.log(userProfile)}
                    <Button
                      onClick={handleLogOut}
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
      </Navbar>
      <Collapse in={showCategories}>
        <div>
          <Navbar
            bg="white"
            expand="lg"
            className="m-0 px-2 py-0 shadow w-100"
            style={{ position: "fixed", top: 60, zIndex: 999 }}
          >
            <div className="d-flex flew-row w-100">
              {categories.map((element, index) => (
                <div
                  key={index}
                  className={`d-flex flex-column ms-auto ${
                    index === categories.length - 1 ? "me-auto" : ""
                  }`}
                >
                  <div className="d-flex flex-row align-items-center m-0 p-0">
                    <Dropdown>
                      <Dropdown.Toggle variant="link" className="text-black" />
                      <Dropdown.Menu>
                        <div className="container">
                          {categories
                            .filter(
                              (category) => category.name !== element.name
                            )
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

                    <Link
                      key={element.name}
                      to={`/categories/${element.name}`}
                      className="text-black"
                      style={{ textDecoration: "none" }}
                    >
                      <strong className="ms-1 me-1">{element.name}</strong>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Navbar>
        </div>
      </Collapse>
    </>
  );
}
