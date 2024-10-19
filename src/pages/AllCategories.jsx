import React, { useContext, useEffect, useState } from "react";
import getCategories from "../conections/getCategories";
import { NotificationContext } from "../context/NotificationContext";
import { Button, Dropdown, Form, Nav, Offcanvas } from "react-bootstrap";
import { CgUserList } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { UserProfileContext } from "../context/UserProfileContext";
import { RiLogoutBoxFill } from "react-icons/ri";
import { EditModeContext } from "../context/EditModeContext";
import { ClicksNumberContext } from "../context/ClicksNumberContext";
import { click } from "@testing-library/user-event/dist/click";

function AllCategories({ showOffCanvas, setShowOffCanvas, mobile = false }) {
  const {
    userProfile,
    setUserProfile,
    guestProfile,
    setShowSignup,
    setShowLogin,
    setShowProfile,
  } = useContext(UserProfileContext);

  const { categoriesClicks, setCategoriesClicks } =
    useContext(ClicksNumberContext);

  const [clickedCategories, setClickedCategories] = useState([]);

  const { setEditMode } = useContext(EditModeContext);
  const { setNotifications } = useContext(NotificationContext);
  const [categories, setCategories] = useState([]);
  const [filteredCat, setFilteredCat] = useState([]);

  const [recentCat, setRecentCat] = useState([]);

  useEffect(() => {
    getCategories(setCategories, setRecentCat, setNotifications);
  }, []);

  useEffect(() => {
    let length = 3;
    let temp;

    if (categoriesClicks.length >= length) {
      temp = categoriesClicks.slice(0, length);
      temp = temp.sort((a, b) => {
        return b.clicks - a.clicks;
      });
      setClickedCategories(temp);
    } else {
      temp = [categoriesClicks[0]];
      temp = temp.sort((a, b) => {
        return b.clicks - a.clicks;
      });
      setClickedCategories(temp);
    }
  }, [categoriesClicks]);

  let guest = userProfile.rol === 0 ? true : false;

  const handleClicks = (element, index) => {
    if (!element?.name) return;
    let temp = [...categoriesClicks];
    if (!Array.isArray(categoriesClicks)){
      temp = []
    } else if (temp[index] === undefined) {
      temp.push({
        name: element.name,
        clicks: 1,
      });
    } else {
      temp[index] = {
        name: temp[index]?.name ? temp[index].name:element.name,
        clicks: temp[index]?.clicks ? temp[index].clicks + 1 : 1,
      };
    }
    setCategoriesClicks(temp);
  };

  const recentCategories = (element, index) => {
    if (!element?.name) return;
    let temp = [...recentCat];
    if (temp[0] !== element) {
      temp = temp.filter((item)=>item!==element)
      temp.unshift(element)
    }
    setRecentCat(temp);
  };

  return (
    <>
      <Offcanvas
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        placement="end"
      >
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
            {mobile ? (
              guest ? (
                <div className="d-flex justify-content-center w-100">
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
                </div>
              ) : (
                <div className="d-flex flex-row w-100 justify-content-center align-items-center mb-2">
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
              )
            ) : null}
            <div className="d-flex flex-column w-100 justify-content-center align-items-center mb-2">
              Recents
              {recentCat.length > 0
                ? recentCat.map((element, index) => (
                    <Link
                      key={element.name}
                      to={`/categories/${element.name}`}
                      className="text-black"
                      style={{ textDecoration: "none" }}
                    >
                      <strong className="ms-1 me-1">{element.name}</strong>
                    </Link>
                  ))
                : null}
            </div>
            <div className="d-flex flex-column w-100 justify-content-center align-items-center mb-2">
              Most Visited
              {clickedCategories?.name && clickedCategories.length > 0
                ? clickedCategories.map((element, index) => (
                    <Link
                      key={element.name}
                      to={`/categories/${element.name}`}
                      className="text-black"
                      style={{ textDecoration: "none" }}
                      onClick={() => handleClicks(element, index)}
                    >
                      <strong className="ms-1 me-1">{element.name}</strong>
                    </Link>
                  ))
                : null}
            </div>
            <Form className="d-flex justify-content-center w-100 mb-2">
              <Form.Control
                id="search-input"
                type="search"
                placeholder="Search Prod"
                className="d-flex rounded-pill"
                onChange={(event) => {
                  let temp = [...categories];

                  temp = temp.filter(function (element) {
                    return element.name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase());
                  });
                  setFilteredCat(temp);
                }}
              />
            </Form>
            <div className="d-flex flex-column w-100 justify-content-center align-items-center">
              {filteredCat.length === 0
                ? categories.map((element, index) => (
                    <div className="d-flex flex-column justify-content-center mb-2">
                      <Link
                        key={element.name}
                        to={`/categories/${element.name}`}
                        className="text-black"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          handleClicks(element, index);
                          recentCategories(element, index);
                        }}
                      >
                        <strong className="ms-1 me-1">{element.name}</strong>
                      </Link>
                      {mobile
                        ? categories
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
                            ))
                        : null}
                    </div>
                  ))
                : filteredCat.map((element, index) => (
                    <div className="d-flex flex-column justify-content-center mb-2">
                      <Link
                        key={element.name}
                        to={`/categories/${element.name}`}
                        className="text-black"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          handleClicks(element, index);
                          recentCategories(element, index);
                        }}
                      >
                        <strong className="ms-1 me-1">{element.name}</strong>
                      </Link>
                      {mobile
                        ? filteredCat
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
                            ))
                        : null}
                    </div>
                  ))}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AllCategories;
