import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import Product from "../components/Product";
import NewProduct from "../components/NewProduct";
import { EditModeContext } from "../context/EditModeContext";
import LoadingState from "../components/LoadingState";
import { useLocation, useParams } from "react-router";
import Qr from "../components/Qr";
import FeaturedProducts from "../components/FeaturedProducts";

function Products() {
  const [data, setData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { editMode } = useContext(EditModeContext);

  const location = useLocation()
  const params = useParams()

  const [showQr, setShowQr] = useState(false)

  useEffect(()=>{
    if((location.pathname === `/categories/${params.categoryId}/${params.subcategoryId}`)||(location.pathname === `/categories/${params.categoryId}`)){
      setShowQr(true)
    }
    else {
      setShowQr(false)
    }
  },[location,params])
  
  const localIp = process.env.REACT_APP_LOCAL_IP;
  const handleData = async (category1, category2) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/products.php`;
      if  (category1){
        url+=`?category=${category1}`;
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
    <div className={`container ${location !== '/' ? '':'d-flex flex-column h-100'}`}>
      <Qr show={showQr}/>
      {" "}
      {console.log(data)}
      <div className="d-flex flex-row">
        <p className="mt-2 mb-1">
          <strong>Show Items {console.log(data)}</strong>
        </p>
        <Pagination className="mt-0">
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
      <Row>
        {loadingProducts === true ? (
          <LoadingState />
        ) : (
          <>
            {editMode === true ? (<>
            <Col xs={12} sm={6} md={4} lg={3} className="mt-2 mb-2">
                <NewProduct
                  handleData={handleData}
                  filteredCategoryName={params.subcategoryId}
                  elementName={params.categoryId}
                />
              </Col></>
            ) : null}
            {Array.isArray(data) && data.length > 0 ? (
              data.map((product, index) => (
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
                    data={data}
                    setData={setData}
                  />
                </Col>
              ))
            ) : (
              <p>No products available</p> // Mensaje cuando no hay productos
            )}
          </>
        )}
      </Row>
      
    </div>
  );
}

export default Products;
