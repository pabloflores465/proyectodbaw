import React, { useContext, useState } from "react";

import {
  EditProductContext,
  NotificationContext,
  UserProfileContext,
} from "../App";

import { Button, Dropdown, FormCheck, Navbar } from "react-bootstrap";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";

import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import Search from "../components/Search";
import Cart from "../components/Cart";
import { IoLogIn } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NavigationDesktop({
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

  const [showCategories, setShowCategories] = useState(true);

  let categories = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
  ];

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
        style={{ position: "fixed", top: 0, zIndex: 1000 }}
      >
        <Navbar.Brand href="/" className="text-white me-0">
          <img
            alt="Logo"
            src="/logo512.png"
            width="50"
            height="50"
            className="d-inline-block align-center"
          />{" "}
          D&P Petshop
        </Navbar.Brand>
        <Button
          className="text-white rounded-pill d-flex justify-content-center align-items-center"
          onClick={() => setShowCategories(!showCategories)}
        >
          <MdMenu size={"2rem"} />
        </Button>
        <div className="d-flex justify-content-center align-items-center w-100 m-auto">
          <Search />
        </div>

        {editProduct === false && userProfile.rol !== 0 ? (
          <div className="d-flex flex-row justify-content-center align-items-center text-white">
            <Cart />
          </div>
        ) : null}

        {userProfile.rol === 3 || userProfile.rol === 2 ? (
          <>
            <div className="text-white" style={{ whiteSpace: "nowrap" }}>
              Edit Mode
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
      </Navbar>
      {showCategories === true ? (
        <Navbar
          bg="white"
          expand="lg"
          className="m-0 ps-2 pe-2 pt-1 pb-1 shadow w-100"
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
                <Link key={element} to={`/${element}`}>
                  {element}
                </Link>
              </div>
            ))}
          </div>
        </Navbar>
      ) : null}
    </>
  );
}
