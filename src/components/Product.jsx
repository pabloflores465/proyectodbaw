import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Dropdown, Form, FormControl } from "react-bootstrap";
import { FaListAlt, FaSave, FaShoppingCart } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { EditProductContext } from "../context/EditProductContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UserProfileContext } from "../context/UserProfileContext";

export default function Product({ product, index, handleData }) {
  const { editProduct } = useContext(EditProductContext);
  const { userProfile } = useContext(UserProfileContext);

  const { windowWidth } = useContext(WindowWidthContext);
  const [category, setCategory] = useState([]);

  const [formData, setFormData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const localIp = process.env.REACT_APP_LOCAL_IP;

  const handleCategories = async () => {
    try {
      const response = await axios.get(
        `http://${localIp}/proyectodbaw/phpsql/categories2.php`
      );
      console.log("Categories response:", response.data);
      setCategory(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    handleCategories();
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/hola.png"; // Ruta de la imagen que quieres descargar
    link.download = "hola.png"; // Nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  const params = useParams();

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://${localIp}/proyectodbaw/phpsql/products.php?id=${id}`
      );
      handleData();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleSave = async (id, e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.put(
        `http://${localIp}/proyectodbaw/phpsql/products.php?id=${id}`,
        formData
      );
      handleData();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategories,
    }));
  }, [selectedCategories]);

  useEffect(() => {
    setFormData({
      id_products: product.id_products,
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: selectedCategories,
    });
    console.log(product.categories);
    if (product && product.categories) {
      setSelectedCategories(product.categories);
    }
  }, [product]);

  const handleCheckboxChange = (e, categoryitem) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryitem.id_category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (categoryId) => categoryId !== categoryitem.id_category
        )
      );
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategories,
    }));
    console.log(selectedCategories);
    console.log(formData);
  };

  return (
    <>
      {editProduct === false ? (
        <Card className="shadow">
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/hola.png`}
            height={240}
            width={320}
          />
          <Card.Body className="d-flex flex-column justify-content-between ps-1 pe-1">
            <Card.Title className="d-flex justify-content-center">
              {product.product_name}
            </Card.Title>
            <Card.Text className="ms-1 me-1">{product.description}</Card.Text>
            <Card.Text className="d-flex justify-content-center">
              Price: <strong> $.{product.price}</strong>
            </Card.Text>

            <div
              className={
                windowWidth > 1300
                  ? "d-flex flex-row justify-content-center"
                  : "d-flex flex-column justify-content-center"
              }
            >
              {userProfile.rol != 0 ? (
                <Button
                  variant="secondary"
                  className={
                    windowWidth > 1300
                      ? "text-white rounded-pill me-1 d-flex align-items-center justify-content-center"
                      : "text-white rounded-pill mx-4 mb-2 d-flex align-items-center justify-content-center"
                  }
                >
                  <strong>
                    {" "}
                    <FaShoppingCart /> Add to Card{" "}
                    {console.log(product.categories)}
                  </strong>
                </Button>
              ) : null}
              <Button
                variant="success"
                className={
                  windowWidth > 1300
                    ? "rounded-pill text-white d-flex ms-2 d-flex align-items-center justify-content-center"
                    : "text-white rounded-pill mx-4 mb-2 d-flex align-items-center justify-content-center"
                }
                onClick={() => navigate(`/products/${product.product_name}`)}
              >
                <IoMdInformationCircle /> <strong>See Details</strong>
              </Button>
            </div>
            <div className="w-100">
              <Dropdown
                className={
                  windowWidth > 1300
                    ? "d-flex justify-content-center align-items-center mt-2 "
                    : " d-flex text-white rounded-pill mx-4 mb-2 d-flex align-items-center justify-content-center"
                }
              >
                <Dropdown.Toggle
                  className={
                    windowWidth > 1300
                      ? "text-white rounded-pill"
                      : "w-100 text-white rounded-pill"
                  }
                >
                  <FaListAlt /> Categories {console.log(product.categories)}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={
                    windowWidth > 1300
                      ? "pt-0 pb-0 justify-content-center"
                      : "pt-0 pb-0 justify-content-center w-100"
                  }
                >
                  <div className="container mt-2">
                    {product &&
                    Array.isArray(product.categories) &&
                    product.categories.length > 0 ? (
                      category
                        .filter((categoryitem) =>
                          selectedCategories.includes(categoryitem.id_category)
                        )
                        .map((categoryitem, index) => (
                          <div
                            key={index}
                            className={`d-flex justify-content-center align-items-center ${
                              index === category.length - 1
                                ? ""
                                : "border-bottom"
                            } mb-2`}
                          >
                            {categoryitem.name}{" "}
                            {/* Mostrar solo el nombre de la categoría */}
                          </div>
                        ))
                    ) : (
                      <div>No categories available</div>
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="shadow w-100 h-100">
            <Form className="m-2">
              <Form.Group>
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="file" className="mb-2" />
                <Form.Control
                  type="text"
                  value={"Image: hola.png"}
                  readOnly
                  onClick={handleDownload}
                  className="mb-2"
                  style={{ cursor: "pointer" }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  name="product_name"
                  type="text"
                  className="mb-2"
                  defaultValue={formData.product_name}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Description</Form.Label>
                <FormControl
                  as="textarea"
                  rows={3}
                  defaultValue={product.description}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  className="mb-2"
                  defaultValue={formData.price}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>stock:</Form.Label>
                <Form.Control
                  name="stock"
                  type="number"
                  className="mb-2"
                  defaultValue={formData.stock}
                  onChange={handleInput}
                />
              </Form.Group>
              <div
                className={
                  windowWidth > 1000
                    ? "d-flex flex-row justify-content-center mb-2"
                    : "d-flex flex-column justify-content-center mb-2"
                }
              >
                <Dropdown
                  className={
                    windowWidth > 1300
                      ? "d-flex justify-content-center align-items-center mt-2 "
                      : " d-flex text-white rounded-pill mx-4 mb-2 d-flex align-items-center justify-content-center"
                  }
                >
                  <Dropdown.Toggle
                    className={
                      windowWidth > 1300
                        ? "text-white rounded-pill"
                        : "w-100 text-white rounded-pill"
                    }
                  >
                    <FaListAlt /> Categories
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className={
                      windowWidth > 1300
                        ? "pt-0 pb-0 justify-content-center"
                        : "pt-0 pb-0 justify-content-center w-100"
                    }
                  >
                    <div className="container mt-2">
                      {category.map((categoryitem, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          id={`category-checkbox-${index}`}
                          label={categoryitem.name}
                          className={`d-flex justify-content-center align-items-center ${
                            index === category.length - 1 ? "" : "border-bottom"
                          } mb-2`}
                          checked={selectedCategories.includes(
                            categoryitem.id_category
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, categoryitem)
                          }
                        />
                      ))}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="secondary"
                  type="submmit"
                  className={
                    windowWidth > 1000
                      ? "text-white rounded-pill d-flex align-items-center justify-content-center"
                      : "text-white rounded-pill d-flex align-items-center justify-content-center mb-2"
                  }
                  style={{ whiteSpace: "nowrap" }}
                  onClick={(e) => handleSave(product.id_products, e)}
                >
                  <FaSave /> Save Changes
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  className={
                    windowWidth > 1000
                      ? "rounded-pill text-white d-flex ms-2 d-flex align-items-center justify-content-center"
                      : "rounded-pill text-white d-flex d-flex align-items-center justify-content-center"
                  }
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => handleDelete(product.id_products)}
                >
                  <MdDelete className="me-1" /> Delete
                </Button>
              </div>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}
