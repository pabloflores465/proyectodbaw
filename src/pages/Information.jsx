import React, { useContext, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router";
import { WindowWidthContext } from "../context/WindowWidthContext";
import "../customStyles/Information.css";

function Information() {

  // Crear una referencia para el componente de destino
  const location = useLocation();
  const targetRef = useRef(null);
  const { windowWidth } = useContext(WindowWidthContext);

  useEffect(() => {
    // Si la referencia existe, desplazarse hasta allí
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Se ejecuta solo al cargar el componente

  return (
    <div className="full-height bg-image">
      <div className="d-flex justify-content-center">
        <Card
          ref={location === "/about/mission" ? targetRef : null}
          style={{ width: windowWidth > 1000 ? "35rem" : "20rem" }}
          className="shadow mx-2 my-4 translate-up"
        >
          <Card.Body>
            <Card.Title>Mission</Card.Title>
            <Card.Text>
              Our mission is to provide high-quality products and exceptional
              care for pets and their owners, ensuring that every animal lives a
              happy, healthy, and fulfilling life. We aim to be a trusted
              partner in pet care, offering a wide range of supplies and expert
              advice for all pets, from the tiniest fish to the largest dogs.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex justify-content-center">
        <Card
          ref={location === "/about/vision" ? targetRef : null}
          style={{ width: windowWidth > 1000 ? "35rem" : "20rem" }}
          className="shadow mx-2 mb-4 translate-up"
        >
          <Card.Body>
            <Card.Title>Vision</Card.Title>
            <Card.Text>
              To be the go-to pet shop for animal lovers, known for our
              commitment to innovation, sustainability, and the well-being of
              pets. We envision a future where every pet has access to the best
              possible care, products, and services, creating stronger bonds
              between pets and their families.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex justify-content-center">
        <Card
          ref={location === "/about/who" ? targetRef : null}
          style={{ width: windowWidth > 1000 ? "35rem" : "20rem" }}
          className="shadow mx-2 mb-4 translate-up"
        >
          <Card.Body>
            <Card.Title>¿Who are We?</Card.Title>
            <Card.Text>
              We are a passionate team of pet lovers dedicated to enhancing the
              lives of animals and their owners. At DP Petshop, we believe that
              pets are more than just animals—they're family. With years of
              experience in the industry, we offer personalized service, expert
              advice, and a carefully curated selection of products to meet the
              unique needs of every pet.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Information;
