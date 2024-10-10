import React, { useContext, useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { WindowWidthContext } from "../context/WindowWidthContext";
import axios from "axios";

export default function NewProducts({ handleData }) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost/proyectodbaw/phpsql/products.php',{
        name : name,
        desc : desc,
        price : price,
        stock : stock
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
          </div>
        </Form>
      </Card>
    </>
  );
}
