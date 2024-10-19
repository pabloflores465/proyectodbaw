import React from "react";
import { useParams } from "react-router";
import { UserProfileContext } from "../context/UserProfileContext";
import { useContext, useState, useEffect } from "react";
import getCartItems from "../conections/getCartItems";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Image, Table, InputGroup, FormControl } from "react-bootstrap";
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "./LoadingState";
import axios from "axios";
import { LiaWalletSolid } from "react-icons/lia";

export default function OrderList() {
  const [cartItems, setCartItems] = useState([]);
  const params = useParams();
  const { userProfile } = useContext(UserProfileContext);
  const { setNotifications } = useContext(NotificationContext);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  const [total, setTotal]=useState();

  const handleDelete = async (id, idproduct) => {
    try {
      const result = await axios.delete(
        `http://${localIp}/proyectodbaw/phpsql/ProductOrder.php?id=${id}&product=${idproduct}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (userProfile.userId === parseInt(params.userId)) {
      getCartItems(
        userProfile.userId,
        setCartItems,
        setLoadingProducts,
        setNotifications
      );
    }
  }, [userProfile.userId, params.userId, setNotifications]);

  const handleData = async (id) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/total.php?id=${id}`;
      setLoadingProducts(true);
      const response = await axios.get(url);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    handleData(userProfile.userId);
  }, [userProfile.userId]);

  return (
    <div className="container mt-5">
      {userProfile.userId === parseInt(params.userId) ? (
        loadingProducts ? (
          <LoadingState />
        ) : Array.isArray(cartItems) && cartItems.length > 0 ? (
          <div>
            <h2>Your Cart ({cartItems.length} items)</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="d-flex align-items-center">
                      <Image
                        src={`data:image/jpeg;base64,${item.image}`}
                        rounded
                        height={80}
                        width={80}
                        className="me-2"
                      />
                      <div>
                        <strong>{item.product_name}</strong>
                        <p>{item.description}</p>
                      </div>
                    </td>
                    <td>
                      <InputGroup className="mb-3">
                        <Button variant="outline-secondary" size="sm">
                          -
                        </Button>
                        <FormControl
                          value={item.amount}
                          className="text-center"
                          readOnly
                        />
                        <Button variant="outline-secondary" size="sm">
                          +
                        </Button>
                      </InputGroup>
                    </td>
                    <td>${item.total_product_price}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => {
                          console.log(userProfile.userId,
                            parseInt(item.id_products))
                          handleDelete(
                            userProfile.userId,
                            parseInt(item.id_products)
                          );
                        }}
                      >
                        <IoCloseSharp size={"1.5rem"} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
            <h3>TOTAL: Q{total}</h3>
            <Button variant="secondary text-white rounded-pill w-25">
              <LiaWalletSolid />
              Proceed to Checkout
            </Button>
            </div>
          </div>
        ) : (
          <p>No items in cart</p>
        )
      ) : (
        <h1>User no admitido</h1>
      )}
    </div>
  );
}
