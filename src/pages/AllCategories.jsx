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
import axios from "axios";

function AllCategories({ showOffCanvas, setShowOffCanvas, mobile = false }) {
  const localIp = process.env.REACT_APP_LOCAL_IP;

  // Estado para las categorías
  const [categories, setCategories] = useState([]);
  const [filteredCat, setFilteredCat] = useState([]);
  const [recentCat, setRecentCat] = useState([]);

  const {
    userProfile,
    setUserProfile,
    guestProfile,
    setShowSignup,
    setShowLogin,
    setShowProfile,
  } = useContext(UserProfileContext);

  const { categoriesClicks, setCategoriesClicks } = useContext(ClicksNumberContext);
  const [clickedCategories, setClickedCategories] = useState([]);
  const { editMode, setEditMode } = useContext(EditModeContext);
  const { setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    const fetchCategoriesWithNavigationData = async () => {
      try {
        // Obtener categorías
        await getCategories(setCategories, setRecentCat, setNotifications);

        // Obtener los datos de la tabla navigation
        const response = await axios.get(`http://${localIp}/proyectodbaw/phpsql/navigation.php`);
        const navigationData = response.data;

        // Marcar las categorías en el dropdown según la tabla navigation
        setCategories((prevCategories) =>
          prevCategories.map((category) => {
            // Verificar si esta categoría tiene subcategorías marcadas
            const subcategoriesToMark = navigationData
              .filter((nav) => nav.id_category === category.id_category)
              .map((nav) => nav.id_sub);

            return {
              ...category,
              subcategoriesToMark, // Añadimos un array con los IDs de las subcategorías que deben estar marcadas
            };
          })
        );
      } catch (error) {
        console.error("Error al obtener los datos de navigation:", error);
      }
    };

    fetchCategoriesWithNavigationData();
  }, []);

  useEffect(() => {
    let length = 3;
    let temp;
    if (localStorage.getItem("numberClicks") === null) {
      return;
    }
    else if (!Array.isArray(categoriesClicks)) {return} else if (categoriesClicks.length >= length) {
      temp = categoriesClicks.slice(0, length);
      temp = temp.sort((a, b) => b.clicks - a.clicks);
      setClickedCategories(temp);
    } else {
      temp = [categoriesClicks[0]];
      temp = temp.sort((a, b) => b.clicks - a.clicks);
      setClickedCategories(temp);
    }
  }, [categoriesClicks]);

  const hasNoNull = clickedCategories.every((element) => element !== null);

  const handleFormCheckChange = async (id_category, id_sub, event) => {
    const isChecked = event.target.checked;
    try {
      const response = await axios.post(`http://${localIp}/proyectodbaw/phpsql/navigation.php`, {
        id_category: id_category,
        id_sub: id_sub,
        is_checked: isChecked ? 1 : 0,
      });
      console.log("Respuesta de la API:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleSave = async (id, element) => {
    try {
      const response = await axios.put(
        `http://${localIp}/proyectodbaw/phpsql/categories2.php?id=${id}`,
        element
      );
      console.log("Success:", response.data);
      getCategories(setCategories, setRecentCat, setNotifications);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClicks = (element, index) => {
    if (!element || !element.name) return;
    let temp = [...categoriesClicks];
    if (!Array.isArray(clickedCategories)) {
      temp = [];
    } else if (element.name === undefined) {
      temp.push({ name: element.name, clicks: 1 });
    } else {
      temp[index] = {
        name: temp[index]?.name ? temp[index].name : element.name,
        clicks: temp[index]?.clicks ? temp[index].clicks + 1 : 1,
      };
    }
    setCategoriesClicks(temp);
  };

  const recentCategories = (element) => {
    if (!element?.name) return;
    let temp = [...recentCat];
  
    // Remueve el elemento si ya existe en recentCat para evitar duplicados
    temp = temp.filter((item) => item.name !== element.name);
    // Añade el elemento al principio de la lista
    temp.unshift(element);
    // Limita recentCat a las tres categorías más recientes
    setRecentCat(temp.slice(0, 3));
  };

  return (
    <>
      <Offcanvas
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        placement="end"
      >
        <Offcanvas.Header className="bg-primary text-white pb-0 pt-0" closeButton>
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
              userProfile.rol === 0 ? (
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
                    className="bg-secondary text-white me-2 rounded-pill d-flex justify-content-center align-items-center mb-2"
                    style={{ whiteSpace: "nowrap", border: "none" }}
                  >
                    <IoLogIn className="me-1" /> Log In
                  </Button>
                </div>
              ) : (
                <div className="d-flex flex-row w-100 justify-content-center align-items-center mb-2">
                  <Dropdown className="w-100">
                    <Dropdown.Toggle variant="link" className="d-flex flex-row w-100 align-items-center">
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
                        {userProfile.rol === 3 && (
                          <Dropdown.Item className="text-success" style={{ textAlign: "center" }}>
                            <Button
                              variant="link"
                              as={Link}
                              to="/UserList"
                              className="m-0 p-0 text-success"
                            >
                              <CgUserList /> Users List
                            </Button>
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item className="border-top" style={{ textAlign: "center" }}>
                          <Button
                            onClick={() => setShowProfile(true)}
                            variant="link"
                            className="m-0 p-0 text-success"
                          >
                            <IoMdPersonAdd /> Profile
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item className="border-top" style={{ textAlign: "center" }}>
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
               {Array.isArray(recentCat) && recentCat.length > 0
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
              {localStorage.getItem("numberClicks") !== null &&
                hasNoNull &&
                Array.isArray(clickedCategories) &&
                clickedCategories.length > 0 &&
                clickedCategories.map((element, index) => (
                  <Link
                    key={element.name}
                    to={`/categories/${element.name}`}
                    className="text-black"
                    style={{ textDecoration: "none" }}
                    onClick={() => handleClicks(element, index)}
                  >
                    <strong className="ms-1 me-1">{element.name}</strong>
                  </Link>
                ))}
            </div>
            <Form className="d-flex justify-content-center w-100 mb-2">
              <Form.Control
                id="search-input"
                type="search"
                placeholder="Search Prod"
                className="d-flex rounded-pill"
                onChange={(event) => {
                  let temp = categories.filter((element) =>
                    element.name.toLowerCase().includes(event.target.value.toLowerCase())
                  );
                  setFilteredCat(temp);
                }}
              />
            </Form>
            <div className="d-flex flex-column w-100 justify-content-center align-items-center">
              {filteredCat.length === 0
                ? categories.map((element, index) => (
                    <div className="d-flex flex-column justify-content-center mb-2" key={index}>
                      <Link
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
                      {editMode && (
                        <>
                          <Form.Check
                            label="Is Featured"
                            defaultChecked={parseInt(element.isfeatured)}
                            onChange={(e) => {
                              let temp = [...categories];
                              temp[index].isfeatured = e.target.checked ? "1" : "0";
                              handleSave(element.name, temp[index]);
                            }}
                          />
                          <Dropdown>
                            <Dropdown.Toggle variant="link" className="text-black" />
                            <Dropdown.Menu>
                              <div className="container">
                                {categories
                                  .filter((category) => category.name !== element.name)
                                  .map((filteredCategory, index2) => (
                                    <Form.Check
                                      key={index2}
                                      label={filteredCategory.name}
                                      defaultChecked={
                                        element.subcategoriesToMark &&
                                        element.subcategoriesToMark.includes(filteredCategory.id_category)
                                      }
                                      onChange={(e) => {
                                        handleFormCheckChange(
                                          element.id_category,
                                          filteredCategory.id_category,
                                          e
                                        );
                                      }}
                                    />
                                  ))}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </>
                      )}
                    </div>
                  ))
                : filteredCat.map((element, index) => (
                    <div className="d-flex flex-column justify-content-center mb-2" key={index}>
                      <Link
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
