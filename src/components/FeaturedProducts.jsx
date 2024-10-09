
import Carousel from "react-bootstrap/Carousel";
//import ExampleCarouselImage from 'components/ExampleCarouselImage';

function FeaturedProducts() {
  return (
    <Carousel style={{marginTop:'60px'}}>
      <Carousel.Item>
        <img
          src="hola.png"
          className="d-block w-100"
          alt="1"
          style={{ objectFit: "cover", width: "480px", height:"270px" }}
        />

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="hola.png"
          className="d-block w-100"
          alt="2"
          style={{ objectFit: "cover", width: "480px", height:"270px" }}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="hola.png"
          className="d-block w-100"
          alt="3"
          style={{ objectFit: "cover", width: "480px", height:"270px" }}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="hola.png"
          className="d-block w-100"
          alt="4"
          style={{ objectFit: "cover", width: "480px", height:"270px" }}
        />

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default FeaturedProducts;
