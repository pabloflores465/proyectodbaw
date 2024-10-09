import { Col, Container, Pagination, Row } from "react-bootstrap";
import Product from "../components/Product";
import BestSellers from "../components/BestSellers";
import { useContext, useState, useEffect } from "react";
import { EditProductContext } from "../App";
import NewProducts from "../components/NewProducts";
import axios from "axios";
import FeaturedProducts from "../components/FeaturedProducts";

function CategoryPage() {
  const { editProduct } = useContext(EditProductContext);
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const response = await axios.get ('http://localhost/proyectodbaw/phpsql/products.php');
      setData(response.data);
      if (response.data.status === "success"){
        console.log(response.data.message);
      }
    }catch(error){
      console.error('Error: ', error);
    }
  }
  useEffect(() => {
    handleData();
    console.log(data);
  }, []);

  return (
    <div style={{ backgroundColor: "#fcf3f4", marginTop: "60px" }}>
      {editProduct === false ? (
        <FeaturedProducts />
      ) : (
        <div style={{ marginTop: "60px" }} />
      )}
      <Container >
        <div className="d-flex flex-row">
          
          <p className="mt-2 mb-1">
            <strong>Show Items</strong>
          </p>
          <Pagination className="mt-0">
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
          {editProduct === true ? <NewProducts /> : null}
        </div>
        <Row>
          {!Array.isArray(data) === true ? (null) : (data.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index} className="mt-2 mb-2">
              <Product product={product} index={index} handleData={handleData} />
            </Col>)
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CategoryPage;