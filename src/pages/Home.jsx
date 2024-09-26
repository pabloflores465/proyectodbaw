import { Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import BestSellers from "../components/BestSellers";

function Home() {
  const products = [
    {
      title: "Product 1",
      description: "A cool product with awesome features.",
      price: 120,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 2",
      description: "This product is top quality and affordable.",
      price: 80,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 3",
      description: "An innovative product for everyday use.",
      price: 150,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 4",
      description: "Durable and long-lasting, a must-have.",
      price: 200,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 5",
      description: "Stylish design with great functionality.",
      price: 60,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 6",
      description: "An eco-friendly product that reduces waste.",
      price: 95,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 7",
      description: "A gadget that simplifies your life.",
      price: 130,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 8",
      description: "Compact and efficient, perfect for small spaces.",
      price: 75,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 9",
      description: "A premium product for the discerning buyer.",
      price: 220,
      image: "https://via.placeholder.com/200x160",
    },
    {
      title: "Product 10",
      description: "An affordable yet highly functional product.",
      price: 50,
      image: "https://via.placeholder.com/200x160",
    },
  ];

  return (
    <div style={{backgroundColor:'#fcf3f4'}}>
      <BestSellers/>
      <Container>
        <Row>
          {products.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
              <Product
                productTitle={product.title}
                productDescription={product.description}
                productPrice={product.price}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
