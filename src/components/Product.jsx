import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function Product({
  productTitle,
  productDescription,
  productPrice,
}) {
  return (
    <Card className="shadow w-100 h-100">
      <Card.Img
        variant="top"
        src="hola.png"
        height={160}
        width={200}
      />
      <Card.Body className="d-flex flex-column justify-content-between ps-1 pe-1">
        <Card.Title className="d-flex justify-content-center">
          {productTitle}
        </Card.Title>
        <Card.Text className="ms-1 me-1">{productDescription}</Card.Text>
        <Card.Text className="d-flex justify-content-center">
          Price: <strong> $.{productPrice}</strong>
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
            className="rounded-pill text-white d-flex ms-2 d-flex align-items-center justify-content-cente"
          >
            <IoInformationCircleSharp /> <strong>See Details</strong>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
