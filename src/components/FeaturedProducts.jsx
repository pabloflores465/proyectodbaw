import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import getFeaturedProducts from "../conections/getFeaturedProducts";
import { NotificationContext } from "../context/NotificationContext"

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const params = useParams();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const {setNotifications} = useContext(NotificationContext)

  useEffect(() => {
    {console.log(params)}
    getFeaturedProducts(params.categoryId, params.subcategoryId, setFeaturedProducts, setLoadingProducts, setNotifications)
  }, [params]);

  return (
    <Carousel>
      {loadingProducts ? (
        <LoadingState />
      ) : Array.isArray(featuredProducts) ?
        (featuredProducts
          .filter((product) => product.product_name)
          .map((product, index) => (
            <Carousel.Item key={index}>
              {console.log("Featured Products:", featuredProducts)}
              <img
                src={`data:image/jpeg;base64,${product.image}`} // Imagen fija
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
      ):null}
    </Carousel>
  );
}

export default FeaturedProducts;
