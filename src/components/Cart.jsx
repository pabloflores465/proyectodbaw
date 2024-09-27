import React, { useRef, useState } from "react";
import { Button, Card, Image, OverlayTrigger } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

export default function Cart() {
    const [showProducts, setShowProducts] = useState(false);
    
    const target = useRef(null); 

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Card
            bg="secondary"
            className="text-white ps-0 pe-0"
            style={{ maxWidth: "350px", zIndex:1000 }}
          >
            <Card.Header>Products</Card.Header>
            <Card.Body className="p-0">
              <div className="d-flex justify-content-center rounded-bottom bg-white align-items-center" >
                <Image src="/hola.png" rounded height={80} width={80} />
                <p className="pe-2 ms-3 text-black" style={{ maxWidth: "55%" }}>
                  <strong>title</strong>
                  <br />
                  ohoiahkjfhssdajkjadoadjkfahkjfhssdajkjadoadjkfahkjfhssdajkjadoadjkfa
                  <br />
                  <strong>$.100.00</strong>
                </p>

                <Button variant="link">
                  <IoCloseSharp size={"1.5rem"} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        }
        trigger="click"
      >
        <Button
          ref={target}
          onClick={() => setShowProducts(!showProducts)}
          className="ms-auto me-1 text-white"
        >
          <FaShoppingCart size={"2rem"} />
        </Button>
      </OverlayTrigger>
    </>
  );
}
