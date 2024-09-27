import React, { useContext } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { FaSave, FaShoppingCart } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { EditProductContext } from "../App";

export default function Product({ product, index }) {
  const { editProduct } = useContext(EditProductContext);

  return (
    <>
      {editProduct === false ? (
        <Card className="shadow w-100 h-100">
          <Card.Img variant="top" src="hola.png" height={240} width={320} />
          <Card.Body className="d-flex flex-column justify-content-between ps-1 pe-1">
            <Card.Title className="d-flex justify-content-center">
              {product.title}
            </Card.Title>
            <Card.Text className="ms-1 me-1">{product.description}</Card.Text>
            <Card.Text className="d-flex justify-content-center">
              Price: <strong> $.{product.price}</strong>
            </Card.Text>

            <div className="d-flex flex-row justify-content-center">
              <Button
                variant="secondary"
                className="text-white rounded-pill me-1 d-flex align-items-center justify-content-cente"
              >
                <strong>
                  {" "}
                  <FaShoppingCart /> Add to Card
                </strong>
              </Button>
              <Button
                variant="success"
                className="rounded-pill text-white d-flex ms-2 d-flex align-items-center justify-content-center"
              >
                <IoInformationCircleSharp /> <strong>See Details</strong>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow w-100 h-100">
          <Form className="m-2">
            <Form.Group>
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" className="mb-2" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Title</Form.Label>
              <Form.Control type="text" className="mb-2" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <FormControl as="textarea" rows={3} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" className="mb-2" />
            </Form.Group>
            <div className="d-flex flex-row justify-content-center">
              <Button
                variant="secondary"
                type="submmit"
                className="text-white rounded-pill me-1 d-flex align-items-center justify-content-cente"
                style={{whiteSpace:'nowrap'}}
              >
                <strong>
                  <FaSave /> Save Changes
                </strong>
              </Button>
              <Button
                variant="success"
                className="rounded-pill text-white d-flex ms-2 d-flex align-items-center justify-content-center"
                style={{whiteSpace:"nowrap"}}
              >
                <IoInformationCircleSharp /> <strong>See Details</strong>
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </>
  );
}
