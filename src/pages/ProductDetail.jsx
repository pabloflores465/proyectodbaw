import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { WindowWidthContext } from "../context/WindowWidthContext";
import {useParams} from "react-router";
import axios from "axios";

function ProductDetail() {
  const { windowWidth } = useContext(WindowWidthContext);
  const params = useParams(); //id
  const [data, setData]=useState([]);
  const [ loadingProducts, setLoadingProducts] = useState(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  
  const handleData = async (id) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/Dproducts.php`;
      if (id){
        url+=`?product=${id}`;
      }
      setLoadingProducts(true);
      const response = await axios.get(url);
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    handleData(params.id);
  }, []);

  return windowWidth > 1000 ? (
    <>
      <div className="d-flex flex-row" style={{marginTop:'70px'}}>
        <div className="container">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center border-bottom mb-2">
              <Image
                src="/hola.png"
                rounded
                height={480}
                width={640}
                className="me-2 mb-2"
              />
              <div className="d-flex flex-column">
                <strong>{data.product_name}</strong>
                <strong>Description:</strong>
                <div
                  className="w-80 border rounded ps-1 pe-2"
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    maxHeight: "100px",
                    width: "200px",
                    overflowY: "auto",
                  }}
                >
                  {data.description}
                  </div>
                <strong>Price: Q{data.price}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
          <div className="d-flex justify-content-center" style={{marginTop:'90px'}}>
          <Image
            src="/hola.png"
            rounded
            height={480}
            width={640}
            className="me-2 mb-2"
          />
          </div>
          <div className="d-flex align-items-center flex-column">
          <strong>{data.product_name}</strong>
          <strong>Description:</strong>
          <div
            className="w-80 border rounded ps-1 pe-2"
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              maxHeight: "100px",
              width: "200px",
              overflowY: "auto",
            }}
          >
            {data.description}
             </div>
          <strong>Price: Q{data.price}</strong>
        </div>
    </>
  );
}

export default ProductDetail;
