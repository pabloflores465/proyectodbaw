import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaSave, FaListAlt } from "react-icons/fa";
import { WindowWidthContext } from "../context/WindowWidthContext";
import axios from "axios";

export default function NewProducts({ handleData, product }) {
  const {windowWidth} = useContext(WindowWidthContext)
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/hola.png"; // Ruta de la imagen que quieres descargar
    link.download = "hola.png"; // Nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const [name, setName]=useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory]=useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

const handleCheckboxChange = (e, categoryitem) => {
  if (e.target.checked) {
    setSelectedCategories([...selectedCategories, categoryitem.id_category]);
  } else {
    setSelectedCategories(
      selectedCategories.filter((categoryId) => categoryId !== categoryitem.id_category)
    );
  }
  console.log(selectedCategories);
};
  
  const handleCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost/proyectodbaw/phpsql/categories2.php"
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedCategories)
    console.log({
      name: name,
      desc: desc,
      price: price,
      stock: stock,
      category: selectedCategories, // Verificar si es un array con los IDs correctos
    });
    try{
      const response = await axios.post('http://localhost/proyectodbaw/phpsql/products.php',{
        name : name,
        desc : desc,
        price : price,
        stock : stock,
        category : selectedCategories
      });
      if (response.data.status==="success") {
        console.log("Registrado");
      }else{

        console.log("no registrado");
      }
      handleData();
    }catch(error){
      console.error('Error: ',error);
    }
  };

  
  return (
    <>
      <Card className="shadow mx-auto">
        <Form 
        onSubmit={(e) => handleSubmit(e)}
        className="m-2">
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
            <Form.Label>stock:</Form.Label>
            <Form.Control
              name="stock"
              type="number"
              className="mb-2"
              placeholder="000"
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          <div
            className={
              windowWidth > 1000
                ? "d-flex flex-row justify-content-center"
                : "d-flex flex-column justify-content-center"
            }
          >
            <Button
              variant="secondary"
              type="submmit"
              className={
                windowWidth > 1000
                  ? "text-white rounded-pill d-flex align-items-center justify-content-center"
                  : "text-white rounded-pill d-flex align-items-center justify-content-center mb-2"
              }
              style={{ whiteSpace: "nowrap" }}
              onClick={(e) => handleSubmit(e)}
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
                <Dropdown.Menu className={windowWidth > 1300 ? "pt-0 pb-0 justify-content-center":"pt-0 pb-0 justify-content-center w-100"}>
                <div className="container mt-2">
                {category.map((categoryitem, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      id={`category-checkbox-${index}`}
                      label={categoryitem.name}
                      className={`d-flex justify-content-center align-items-center ${index === category.length - 1 ? "" : "border-bottom"} mb-2`}
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
