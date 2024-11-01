import React from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import getNewProducts from "../conections/getNewProducts";
import { NotificationContext } from "../context/NotificationContext";
import { Link } from "react-router-dom";

export default function NewProducts() {
  const [newProducts, setNewProducts] = useState([]);
  const params = useParams();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    {
      console.log(params);
    }
    getNewProducts(
      params.categoryId,
      params.subcategoryId,
      setNewProducts,
      setLoadingProducts,
      setNotifications
    );
  }, [params]);

  return (
    <Container style={{ overflowX: "auto", whiteSpace: "nowrap", padding: 10 }}>
      <div className="d-flex" style={{ gap: 10 }}>
        <h5>New Products</h5>
        {loadingProducts ? (
          <LoadingState />
        ) : Array.isArray(newProducts) ? (
          newProducts
            .filter((product) => product.product_name)
            .map((product, index) => (
              <Card
                as={Link}
                to={`/products/${product.product_name}`}
                className="translate-up mb-2 rounded-circle"
                style={{
                  minWidth: 200,
                  flex: "0 0 auto",
                  position: "relative",
                }}
                key={index}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <Card.Title style={{ fontSize: 30 }}>
                    {product.product_name}
                  </Card.Title>
                </div>
                <Image
                  src={`data:image/jpeg;base64,${product.image}`}
                  style={{ width: "300px", height: "300px" }}
                  roundedCircle
                />
              </Card>
            ))
        ) : null}
      </div>
    </Container>
  );
}
