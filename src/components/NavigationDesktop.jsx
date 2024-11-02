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
import { FaFile } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "axios";
import Search from "../components/Search";
import Cart from "../components/Cart";
import Qr from "../components/Qr";
import { IoLogIn } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";
import { EditModeContext } from "../context/EditModeContext";
import { NotificationContext } from "../context/NotificationContext";
import { BiSolidCategoryAlt } from "react-icons/bi";
import getCategories from "../conections/getCategories";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import AllCategories from "../pages/AllCategories";
import { ClicksNumberContext } from "../context/ClicksNumberContext";
import { FaBoxOpen } from "react-icons/fa";

export default function NavigationDesktop() {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  const {
    userProfile,
    setUserProfile,
    guestProfile,
    setShowLogin,
    setShowSignup,
    setShowProfile,
  } = useContext(UserProfileContext);
  const { editMode, setEditMode } = useContext(EditModeContext);
  const { setNotifications } = useContext(NotificationContext);

  const [showCategories, setShowCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [navigationData, setNavigationData] = useState([]);

  const { categoriesClicks } = useContext(ClicksNumberContext);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    const fetchCategoriesWithNavigationData = async () => {
      try {
        const response = await axios.get(
          `http://${localIp}/proyectodbaw/phpsql/navigation2.php`
        );
        setNavigationData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de navigation:", error);
      }
    };

    fetchCategoriesWithNavigationData();
  }, [localIp]);

  const getSubcategories = (categoryId, categoryName) => {
    return (
      navigationData[categoryId] &&
      navigationData[categoryId].map((subCategory, index) => (
        <div
          key={index}
          className="d-flex justify-content-center align-items-center mb-2"
        >
          <Link
            to={`/categories/${categoryName}/${subCategory}`}
            className="text-black"
            style={{ textDecoration: "none" }}
          >
            {subCategory}
          </Link>
        </div>
      ))
    );
  };

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

  let guest = userProfile.rol === 0;
  let employee = userProfile.rol === 2;
  let admin = userProfile.rol === 3;


  useEffect(() => {
    const nav = document.getElementById("navbar");

    if (nav) {
      const rect = nav.getBoundingClientRect();

      if (rect.left === 0 && rect.top === 0) {
        nav.style.height = "100px";
      }
    }
  }, []);

  return (
    <>
      <div id="navbar">
        <Navbar
          bg="primary"
          expand="lg"
          className="m-0 ps-2 pe-2 pt-0 pb-0 shadow w-100"
          style={{ position: "fixed", top: 0, zIndex: 1000, height: "60px" }}
        >
          {employee || (admin && editMode) ? (
            <Form className="d-flex align-items-center text-white">
              <Form.Group className="d-flex align-items-center text-white">
                <Form.Control
                  required
                  type="text"
                  placeholder="D&P Petshop"
                  defaultValue="https://i.pinimg.com/736x/79/2e/a4/792ea40494b7d47ab0a5692a67123ffc.jpg"
                  className="my-2 me-2"
                  style={{ width: "150px" }}
                />
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
                src="/logo512.png"
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
            {showCategories ? (
              <GoTriangleDown size={"1.5rem"} />
            ) : (
              <GoTriangleUp size={"1.5rem"} />
            )}
          </Button>
          <div className="d-flex justify-content-center align-items-center w-100 m-auto">
            <Search />
          </div>

          {!editMode && !guest ? (
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
                    {userProfile.rol === 3 && (
                      <>
                        <Dropdown.Item className="d-flex align-items-center border-bottom mb-2 text-success">
                          <Button
                            as={Link}
                            to="/UserList"
                            variant="link"
                            className="m-0 p-0 text-success"
                          >
                            <CgUserList /> Users List
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex align-items-center border-bottom mb-2 text-success">
                          <Button
                            as={Link}
                            to="/orders"
                            variant="link"
                            className="m-0 p-0 text-success"
                          >
                            <FaBoxOpen /> Orders
                          </Button>
                        </Dropdown.Item>
                      </>
                    )}
                    {admin || employee ? (
                      <Dropdown.Item className="d-flex align-items-center mb-2 text-success border-bottom">
                        <Button
                          variant="link"
                          className="m-0 p-0 text-success"
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
            </>
          )}
        </Navbar>
        <Collapse in={showCategories}>
          <div>
            <Navbar
              bg="white"
              expand="lg"
              className="m-0 px-2 py-0 shadow w-100"
              style={{
                position: "fixed",
                top: 60,
                zIndex: 999,
                height: "40px",
              }}
            >
              <div className="d-flex flex-row w-100">
                <Button variant="link" className="ms-2 me-2 text-black">
                  <MdMenu size={"2rem"} onClick={() => setShowOffCanvas(true)} />
                </Button>
                {categories.map((element, index) =>
                  parseInt(element.isfeatured) ? (
                    <div
                      key={index}
                      className={`d-flex flex-column ms-auto ${
                        index === categories.length - 1 ? "me-auto" : ""
                      }`}
                    >
                      <div className="d-flex flex-row align-items-center m-0 p-0">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="link"
                            className="text-black"
                          />
                          <Dropdown.Menu>
                            <div className="container">
                              {getSubcategories(element.id_category, element.name)}
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
                  ) : null
                )}
              </div>
            </Navbar>
          </div>
        </Collapse>
      </div>
      <AllCategories
        showOffCanvas={showOffCanvas}
        setShowOffCanvas={setShowOffCanvas}
      />
      <Qr />
    </>
  );
}
