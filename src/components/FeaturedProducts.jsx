import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingState from "./LoadingState";
//import ExampleCarouselImage from 'components/ExampleCarouselImage';

function FeaturedProducts() {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;

  const handleData = async (category1, category2) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/Fproducts.php`;
      if (category1) {
        url += `?category=${category1}`;
        if (category2) {
          url += `&subCategory=${category2}`;
        }
      }
      setLoadingProducts(true);
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
      if (response.data.status === "success") {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      //setLoadingProducts(false)
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    handleData(params.categoryId, params.subcategoryId);
  }, [params]);

  return (
    <Carousel style={{ marginTop: "60px" }}>
      {loadingProducts ? (
        <LoadingState />
      ) : (
        data
          .filter((product) => product.product_name)
          .map((product, index) => (
            <Carousel.Item key={index}>
              <img
                src={`${process.env.PUBLIC_URL}/hola.png`} // Imagen fija
                className="d-block w-100"
                alt={`Product ${index}`}
                style={{ objectFit: "cover", width: "480px", height: "270px" }}
              />
              <Carousel.Caption>
                <h3>{product.product_name}</h3>
                <p>{product.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
      )}
    </Carousel>
  );
}

export default FeaturedProducts;
