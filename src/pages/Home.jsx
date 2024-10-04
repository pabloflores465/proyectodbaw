import { Col, Container, Pagination, Row } from "react-bootstrap";
import Product from "../components/Product";
import BestSellers from "../components/BestSellers";
import { useContext, useState } from "react";
import { EditProductContext } from "../App";
import NewProducts from "../components/NewProducts";

function Home() {
  const { editProduct } = useContext(EditProductContext);

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Product 1",
      description: "A cool product with awesome features.",
      price: 120,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 2,
      title: "Product 2",
      description: "This product is top quality and affordable.",
      price: 80,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 3,
      title: "Product 3",
      description: "An innovative product for everyday use.",
      price: 150,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 4,
      title: "Product 4",
      description: "Durable and long-lasting, a must-have.",
      price: 200,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 5,
      title: "Product 5",
      description: "Stylish design with great functionality.",
      price: 60,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 6,
      title: "Product 6",
      description: "An eco-friendly product that reduces waste.",
      price: 95,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 7,
      title: "Product 7",
      description: "A gadget that simplifies your life.",
      price: 130,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 8,
      title: "Product 8",
      description: "Compact and efficient, perfect for small spaces.",
      price: 75,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 9,
      title: "Product 9",
      description: "A premium product for the discerning buyer.",
      price: 220,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
    {
      id: 10,
      title: "Product 10",
      description: "An affordable yet highly functional product.",
      price: 50,
      image: "https://via.placeholder.com/200x160",
      categories: ["Cats", "Dogs", "Pets"],
    },
  ]);

  return (
    <div style={{ backgroundColor: "#fcf3f4" }}>
      {editProduct === false ? (
        <BestSellers />
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
          {products.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index} className="mt-2 mb-2">
              <Product product={product} index={index} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
