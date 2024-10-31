import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Dropdown, Form, FormControl } from "react-bootstrap";
import { FaListAlt, FaSave, FaShoppingCart } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { EditModeContext } from "../context/EditModeContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UserProfileContext } from "../context/UserProfileContext";
import Resizer from "react-image-file-resizer";
import { Link } from "react-router-dom";

export default function Product({ product, index, handleData }) {
  const { editMode } = useContext(EditModeContext);
  const { userProfile } = useContext(UserProfileContext);

  const { windowWidth } = useContext(WindowWidthContext);
  const [category, setCategory] = useState([]);

  const [formData, setFormData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [featuredItem, setFeaturedItem] = useState(false);
  const [enableItem, setEnableItem] = useState(false);

  const localIp = process.env.REACT_APP_LOCAL_IP;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // format
        80, // quality percentage
        0, // rotation
        (uri) => {
          setFormData((prevFormData) => {
            const updatedFormData = {
              ...prevFormData,
              image: uri,
          }
          console.log("Updated formData:", updatedFormData.image);

          return updatedFormData;
        });
          
          
        },
        "base64"
      );
    }
    console.log(formData.image);
  };
  

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
    {
      console.log(product);
    }
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
    console.log(id);
    e.preventDefault();
    console.log("formData to send:", formData);
    try {
      await axios.put(
        `http://${localIp}/proyectodbaw/phpsql/products.php?id=${id}`,
        formData,{
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );
      handleData(params.categoryId, params.subcategoryId);
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
    console.log(product.important);
    setFormData({
      id_products: product.id_products,
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: selectedCategories,
      featuredItem: parseInt(product.important) === 1, // Usar parseInt para convertir a entero
      enableItem: parseInt(product.enabled) === 1,
    });
    setFeaturedItem(parseInt(product.important) === 1);
    setEnableItem(parseInt(product.enabled) === 1);
    console.log(product.categories);
    if (product && product.categories) {
      setSelectedCategories(product.categories);
    }
  }, [product]);

  const handleCheckboxChangeFeatured = (e) => {
    setFeaturedItem(e.target.checked);
    setFormData((prevFormData) => ({
      ...prevFormData,
      featuredItem: e.target.checked ? 1 : 0,
    }));
  };

  const handleCheckboxChangeEnable = (e) => {
    setEnableItem(e.target.checked);
    setFormData((prevFormData) => ({
      ...prevFormData,
      enableItem: e.target.checked ? 1 : 0,
    }));
  };

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
      {editMode === false ? (
        <Card
          className="shadow translate-up"
          as={Link}
          to={`/products/${product.product_name}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Img
          name="image"
            variant="top"
            src={`data:image/jpeg;base64,${product.image}`}
            height={250}
            width={250}
          />
          <Card.Body className="d-flex flex-column justify-content-between ps-1 pe-1 mb-4">
            <Card.Title className="d-flex justify-content-center">
              {product.product_name}
            </Card.Title>

            <Card.Text className="d-flex justify-content-center">
              Price: <strong> $.{product.price}</strong>
            </Card.Text>
            <div className="w-100">
              <Dropdown
                className={
                  windowWidth > 1300
                    ? "d-flex justify-content-center align-items-center mt-2 "
                    : " d-flex text-white rounded-pill mx-4 mb-2 d-flex align-items-center justify-content-center"
                }
                onClick={(e) => {
                  e.preventDefault(); // Evita la redirección
                  e.stopPropagation(); // Detiene la propagación
                }}
              >
                <Dropdown.Toggle
                  className={
                    windowWidth > 1300
                      ? "text-white rounded-pill"
                      : "w-100 text-white rounded-pill"
                  }
                  style={{ pointerEvents: "auto" }}
                >
                  <FaListAlt /> Categories {console.log(product.image)}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={
                    windowWidth > 1300
                      ? "pt-0 pb-0 justify-content-center translate-up"
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
                <Form.Label>Product Image {console.log(params)}</Form.Label>
                <Form.Control
                  type="file"
                  className="mb-2"
                  accept="image/*" // Aceptar solo imágenes
                  onChange={(e)=>{handleImageChange(e);
                  }} // Llamar a handleImageChange cuando se seleccione una imagen
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
              <Form.Check
                label="Featured Item"
                checked={featuredItem}
                onChange={handleCheckboxChangeFeatured}
              />
              <Form.Check
                label="Enable Item"
                checked={enableItem}
                onChange={handleCheckboxChangeEnable}
              />
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
