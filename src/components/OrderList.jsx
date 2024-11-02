import React from "react";
import { useNavigate, useParams } from "react-router";
import { UserProfileContext } from "../context/UserProfileContext";
import { useContext, useState, useEffect } from "react";
import getCartItems from "../conections/getCartItems";
import { IoCloseSharp } from "react-icons/io5";
import {
  Button,
  Image,
  Table,
  InputGroup,
  FormControl,
  Modal,
  Alert,
} from "react-bootstrap";
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "./LoadingState";
import axios from "axios";
import { LiaWalletSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function OrderList() {
  const [cartItems, setCartItems] = useState([]);
  const params = useParams();
  const { userProfile } = useContext(UserProfileContext);
  const { setNotifications } = useContext(NotificationContext);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  const [total, setTotal] = useState();
  const [shipping, setShipping] = useState();
  const [minimum, setMinimum] = useState();
  const [orderId, setOrderId] = useState();
  const [paid, setPaid] = useState();
  const [cardInput, setCardInput] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate()

  const handlePayment = async () => {
    if (cardInput !== userProfile.cardNumber) {
      setError("The card number does not match. Please try again.");
      return; // No procede si los números no coinciden
    }
    handleEmailSend();
    try {
      const result = await axios.post(
        `http://${localIp}/proyectodbaw/phpsql/Checkout.php`,
        {
          id_order: parseInt(orderId),
        }
      );
      console.log("Pago procesado:", result.data);
      navigate('/thanks')
      setShowModal(false); // Cierra el modal tras el pago exitoso
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  const handlePaid = async (id) => {
    setLoadingProducts(true);
    axios
      .get(`http://${localIp}/proyectodbaw/phpsql/PaidOrders.php?id=${id}`)
      .then((response) => {
        setLoadingProducts(false);
        setPaid(response.data);
      })
      .catch((error) => {
        console.log(error);
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "There Was An Error Getting the Users",
          },
        ]);
      });
  };

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
      console.log(response.data);
      setTotal(parseInt(response.data.total));
      setMinimum(parseInt(response.data.minimum));
      setShipping(parseInt(response.data.shipping));
      setOrderId(parseInt(response.data.id_order));
      console.log(total, minimum, shipping);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    handleData(userProfile.userId);
    handlePaid(userProfile.userId);
  }, [userProfile.userId]);

  const handleUpdateAmount = async (id, id_product, new_amount) => {
    try {
      // Validar que la cantidad no sea menor o igual a 0
      if (new_amount <= 0) {
        alert("La cantidad no puede ser menor o igual a 0");
        return;
      }

      const result = await axios.put(
        `http://${localIp}/proyectodbaw/phpsql/ProductOrder.php?id=${id}&product=${id_product}&amount=${new_amount}`
      );

      console.log("Cantidad actualizada:", result.data);

      getCartItems(
        userProfile.userId,
        setCartItems,
        setLoadingProducts,
        setNotifications
      );

      handleData(id);
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  const handleEmailSend = async () => {
    try {
      const cartItemsWithoutImage = cartItems.map(({ image, ...rest }) => rest);

    // Preparar los datos para enviar al backend
    const data = {
      cartItems: cartItemsWithoutImage, // Usar el array sin imágenes
      email: userProfile.email // Dirección de correo
    };
      // Convierte cartItems a JSON y envíalos al backend
      const result = await axios.post(
        `http://${localIp}/proyectodbaw/phpsql/sendemail.php`,
        JSON.stringify(data),
      );
  
      console.log("Correo enviado:", result.data);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  

  return (
    <div className="container mt-5">
      {userProfile.userId === parseInt(params.userId) ? (
        loadingProducts ? (
          <LoadingState />
        ) : (
          <div>
            <div>
              {cartItems.length > 0 ? (
                <>
                  <h2>Your Cart ({cartItems.length} items)</h2>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Item {console.log(JSON.stringify(cartItems))}</th>
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
                              <p>Stock: {item.stock}</p>
                            </div>
                          </td>
                          <td>
                            <FormControl
                              name="amount"
                              type="number"
                              defaultValue={item.amount}
                              className="text-center"
                              onKeyDown={(e) => {
                                if (
                                  e.key === "-" ||
                                  e.key === "e" ||
                                  e.key === "+" ||
                                  e.key === "."
                                ) {
                                  e.preventDefault();
                                }

                                if (e.key === "Enter") {
                                  let value = parseInt(e.target.value);
                                  if (value > 0) {
                                    if (value > item.stock) {
                                      value = item.stock;
                                    }
                                    e.target.value = value;
                                  } else {
                                    e.target.value = "";
                                  }
                                  // Update quantity
                                  handleUpdateAmount(
                                    userProfile.userId,
                                    item.id_products,
                                    value
                                  );
                                }
                              }}
                              onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (value > item.stock) {
                                  e.target.value = item.stock;
                                } else if (value <= 0) {
                                  e.target.value = "";
                                }
                              }}
                            />
                          </td>
                          <td>${item.total_product_price}</td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() =>
                                handleDelete(
                                  userProfile.userId,
                                  parseInt(item.id_products)
                                )
                              }
                            >
                              <IoCloseSharp size={"1.5rem"} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="me-auto">
                    <h4>
                      Card number: {userProfile.cardNumber}
                      <br />
                      Expire-Date: {userProfile.expireDate}
                      <br />
                      Address: {userProfile.address}
                    </h4>

                  </div>
                  <div className="text-end">
                    <h4>
                      Subtotal: {total}
                      <br />
                      Shipping: {total > minimum ? 0 : shipping}
                    </h4>
                    <h3>
                      TOTAL: Q{total > minimum ? total : total + shipping}
                    </h3>
                    <Button
                      variant="secondary text-white rounded-pill w-25"
                      onClick={() => setShowModal(true)}
                    >
                      <LiaWalletSolid />
                      Pay Now
                    </Button>
                  </div>

                  {/* Modal for card input */}
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Enter Card Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <FormControl
                        placeholder="Enter your card number"
                        value={cardInput}
                        onChange={(e) => setCardInput(e.target.value)}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </Button>
                      <Button variant="primary" onClick={handlePayment}>
                        Confirm Payment
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ) : (
                <p>No items in cart</p>
              )}
            </div>

            {/* Paid Orders Table (siempre visible) */}
            <div className="mt-5">
              <h3>Paid Orders {console.log(paid)}</h3>
              {Array.isArray(paid) && paid.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>State</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paid.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id_order}</td>
                        <td>{order.date}</td>
                        <td>
                          {order.state == 2 ? (
                            <a>Confirmed</a>
                          ) : order.state == 3 ? (
                            <a>Preparing</a>
                          ) : order.state == 4 ? (
                            <a>In route</a>
                          ): order.state == 5 ? (
                            <a>Completed</a>
                          ) : (
                            <a>Canceled</a>
                          )}
                        </td>
                        <td>{order.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No paid orders available.</p>
              )}
            </div>
          </div>
        )
      ) : (
        <h1>User no admitido</h1>
      )}
    </div>
  );
}
