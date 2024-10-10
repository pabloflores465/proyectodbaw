import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import Product from "../components/Product";
import NewProducts from "../components/NewProducts";
import { EditProductContext } from "../context/EditProductContext";

function Products() {
  const [data, setData] = useState([]);
  const { editProduct } = useContext(EditProductContext);
  const handleData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/proyectodbaw/phpsql/products.php"
      );
      setData(response.data);
      if (response.data.status === "success") {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Container>
      <div className="d-flex flex-row">
        <p className="mt-2 mb-1">
          <strong>Show Items</strong>
        </p>
        <Pagination className="mt-0">
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
      <Row>
        {!Array.isArray(data) === true ? null : (
          <>
            {editProduct === true ? (
              <Col xs={12} sm={6} md={4} lg={3} className="mt-2 mb-2">
                <NewProducts handleData={handleData} />
              </Col>
            ) : null}

            {data.map((product, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                className="mt-2 mb-2"
              >
                <Product
                  product={product}
                  index={index}
                  handleData={handleData}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}

export default Products;
