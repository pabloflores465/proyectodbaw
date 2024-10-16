import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Card, Form } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { useParams } from "react-router";
import LoadingState from "../components/LoadingState";
import axios from "axios";
import { UserProfileContext } from "../context/UserProfileContext";
import { FaShoppingCart } from "react-icons/fa";

function ProductDetail() {
  const { windowWidth } = useContext(WindowWidthContext);
  const params = useParams(); //id
  const [data, setData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  let temp = userProfile;
  const [amount, setAmount] = useState();

  const handleCreate = async () => {
    try {
      console.log(temp.userId)
      const response = await axios.post(
        `http://${localIp}/proyectodbaw/phpsql/Orders.php`,
        {
          id_user: temp.userId,
          id_product: data.id_products,
          amount: amount,
        }
      );
      console.log(response.data);
    } catch (error) {}
  };
  const handleData = async (id) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/Dproducts.php`;
      if (id) {
        url += `?product=${id}`;
      }
      setLoadingProducts(true);
      const response = await axios.get(url);
      console.log(response.data);
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
      <div className="d-flex flex-row" style={{ marginTop: "70px" }}>
        <div className="container">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center border-bottom mb-2">
              <Image
                src={`data:image/jpeg;base64,${data.image}`}
                rounded
                height={480}
                width={640}
                className="me-2 mb-2"
              />
              <div className="d-flex flex-column">
                <strong>{data.product_name}</strong>
                <strong>Description:</strong>
                <div
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
                <a>
                  Stock: {data.stock == 0 ? <a>No disponible</a> : data.stock}{" "}
                </a>
              </div>
              {data.stock > 0 ? (
                <div>
                  <Card>
                    <Form.Group>
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        name="amount"
                        type="number"
                        className="mb-2"
                        onKeyDown={(e) => {
                          if (
                            e.key === "-" ||
                            e.key === "e" ||
                            e.key === "+" ||
                            e.key === "."
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > 0) {
                            if (value > data.stock) {
                              e.target.value = data.stock;
                            }
                          } else {
                            e.target.value = "";
                          }
                          setAmount(value);
                        }}
                      />
                    </Form.Group>

                    <Button
                      variant="secondary text-white rounded-pill w-100"
                      onClick={() => handleCreate()}
                    >
                      <FaShoppingCart /> Add to Cart {console.log(data)}
                    </Button>
                  </Card>
                </div>
              ) : (
                <a>Not available</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "90px" }}
      >
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
        <Button variant="secondary text-white rounded-pill w-100">
          <FaShoppingCart /> Add to Cart
        </Button>
      </div>
    </>
  );
}

export default ProductDetail;
