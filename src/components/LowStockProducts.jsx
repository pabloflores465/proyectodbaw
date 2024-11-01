import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { Button, Card, Dropdown } from "react-bootstrap";
import { FaListAlt } from "react-icons/fa";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { NotificationContext } from "../context/NotificationContext";
import { EditModeContext } from "../context/EditModeContext";
import LoadingState from "../components/LoadingState";
import getLowStockProducts from "../conections/getLowStockProducts";

function LowStockProducts() {
  const { windowWidth } = useContext(WindowWidthContext);
  const [lowProducts, setLowProducts] = useState([]);
  const params = useParams();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const localIp = process.env.REACT_APP_LOCAL_IP;

  // Fetch categories when the component mounts
  useEffect(() => {
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

    handleCategories();
  }, [localIp]);

  // Fetch low stock products based on params
  useEffect(() => {
    console.log(params);
    getLowStockProducts(
      params.categoryId,
      params.subcategoryId,
      setLowProducts,
      setLoadingProducts,
      setNotifications
    );
  }, [params, setNotifications]);

  const location = useLocation();

  return (
    <div
      className={`container ${
        location.pathname !== "/" ? "" : "d-flex flex-column h-100"
      }`}
    >
      <div className="d-flex flex-row">
        <p className="mt-2 mb-1">
          <strong>Low Stock Items</strong>
        </p>
        <Pagination className="mt-0">
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
      <Row>
        {loadingProducts ? (
          <LoadingState />
        ) : (
          <>
            {Array.isArray(lowProducts) && lowProducts.length > 0 ? (
              lowProducts.map((product, index) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  className="mt-2 mb-2"
                >
                <Card
                  key={index}
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
                            ? "d-flex justify-content-center align-items-center mt-2"
                            : "d-flex text-white rounded-pill mx-4 mb-2 align-items-center justify-content-center"
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
                          <FaListAlt /> Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className={
                            windowWidth > 1300
                              ? "pt-0 pb-0 justify-content-center translate-up"
                              : "pt-0 pb-0 justify-content-center w-100"
                          }
                        >
                          <div className="container mt-2">
                            {Array.isArray(product.categories) &&
                            product.categories.length > 0 ? (
                              category
                                .filter((categoryItem) =>
                                  product.categories.includes(categoryItem.id_category)
                                )
                                .map((categoryItem, idx) => (
                                  <div
                                    key={idx}
                                    className={`d-flex justify-content-center align-items-center ${
                                      idx === category.length - 1 ? "" : "border-bottom"
                                    } mb-2`}
                                  >
                                    {categoryItem.name}
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
                </Col>
              ))
            ) : (
              <p>No products available</p>
            )}
          </>
        )}
      </Row>
    </div>
  );
}

export default LowStockProducts;
