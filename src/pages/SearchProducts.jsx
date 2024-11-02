import React, { useContext, useEffect, useState } from "react";
import { SearchProductsContext } from "../context/SearchProductsContext";
import Product from "../components/Product";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

function SearchProducts() {
  const { searchProducts } = useContext(SearchProductsContext);

  const filteredProducts = searchProducts.filter(
    (product, index) =>
      index === 0 || product.id_products !== searchProducts[index - 1].id_products
  );

  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Row className="mx-4 mt-2">
      {filteredProducts.map((element, index) => (
        <Col xs={12} sm={6} md={4} lg={3} key={index} className="mt-2 mb-2">
          <Product product={element} />
        </Col>
      ))}
    </Row>
  );
}

export default SearchProducts;
