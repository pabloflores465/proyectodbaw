import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaSave, FaListAlt } from "react-icons/fa";
import { WindowWidthContext } from "../context/WindowWidthContext";
import axios from "axios";

export default function NewProduct({ handleData, product, elementName, filteredCategoryName }) {
  const { windowWidth } = useContext(WindowWidthContext);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [featuredItem, setFeaturedItem] = useState(false);
  const [enableItem, setEnableItem] = useState(false);

  const localIp = process.env.REACT_APP_LOCAL_IP;

  const handleCategories = async () => {
    try {
      const response = await axios.get(
        `http://${localIp}/proyectodbaw/phpsql/categories2.php`
      );
      setCategory(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    handleCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://${localIp}/proyectodbaw/phpsql/products.php`,
        {
          name: name,
          desc: desc,
          price: price,
          stock: stock,
          category: selectedCategories,
          featuredItem: featuredItem ? 1 : 0,
          enableItem: enableItem ? 1 : 0,
        }
      );
      if (response.data.status === "success") {
        console.log("Registrado");
      } else {
        console.log("no registrado");
      }
      handleData(elementName, filteredCategoryName);
    } catch (error) {
      console.error("Error: ", error);
    }
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
  };

  return (
    <>
      <Card className="shadow mx-auto">
        <Form onSubmit={(e) => handleSubmit(e)} className="m-2">
          <Form.Group>
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="file" className="mb-2" />
            <Form.Control
              type="text"
              value={"Image: hola.png"}
              readOnly
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
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Description</Form.Label>
            <FormControl
              as="textarea"
              rows={3}
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              name="price"
              type="number"
              className="mb-2"
              placeholder="000"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock:</Form.Label>
            <Form.Control
              name="stock"
              type="number"
              className="mb-2"
              placeholder="000"
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            label="Featured Item"
            checked={featuredItem}
            onChange={(e) => setFeaturedItem(e.target.checked)}
          />
          <Form.Check
            label="Enable Item"
            checked={enableItem}
            onChange={(e) => setEnableItem(e.target.checked)}
          />
          <div
            className={
              windowWidth > 1000
                ? "d-flex flex-row justify-content-center"
                : "d-flex flex-column justify-content-center"
            }
          >
            <Button
              variant="secondary"
              type="submit"
              className={
                windowWidth > 1000
                  ? "text-white rounded-pill d-flex align-items-center justify-content-center"
                  : "text-white rounded-pill d-flex align-items-center justify-content-center mb-2"
              }
              style={{ whiteSpace: "nowrap" }}
            >
              <strong>
                <FaSave /> Save New Product
              </strong>
            </Button>
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
                      onChange={(e) => handleCheckboxChange(e, categoryitem)}
                    />
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Form>
      </Card>
    </>
  );
}
