import React, { useState, useContext } from "react";
import { Button, Dropdown, Image} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { UserProfileContext } from "../context/UserProfileContext";
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "../components/LoadingState";
import { LiaWalletSolid } from "react-icons/lia";
import getCartItems from "../conections/getCartItems";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userProfile } = useContext(UserProfileContext);
  const { setNotifications } = useContext(NotificationContext);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;

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

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <Button
      className="text-white rounded-pill"
      variant="link"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        getCartItems(
          userProfile.userId,
          setCartItems,
          setLoadingProducts,
          setNotifications
        );
      }}
    >
      <FaShoppingCart size={"2rem"} />
    </Button>
  ));

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
        <Dropdown.Menu>
          <div
            className="container overflow-auto w-100"
            style={{
              maxHeight: "200px",
            }}
          >
            {loadingProducts ? (
              <LoadingState />
            ) : Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="d-flex flex-column">
                  <div className="d-flex align-items-center border-bottom mb-2">
                    <Image
                      src={`data:image/jpeg;base64,${item.image}`} // Asumiendo que tu objeto item tiene una propiedad 'image'
                      rounded
                      height={80}
                      width={80}
                      className="me-2 mb-2"
                    />
                    <div className="d-flex flex-column">
                      <strong>{item.product_name}</strong>
                      <strong>Description:</strong>
                      <div
                        className="w-80 ps-1 pe-2"
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          maxHeight: "100px",
                          width: "200px",
                          overflowY: "auto",
                        }}
                      >
                        <a>{item.description}</a>
                      </div>
                      <strong>Amount: {item.amount}</strong>
                      <strong>Price: ${item.total_product_price}</strong>
                    </div>
                    <Button
                      variant="link"
                      onClick={() => {
                        handleDelete(
                          userProfile.userId,
                          parseInt(item.id_products)
                        );
                      }}
                    >
                      <IoCloseSharp size={"1.5rem"} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          
            <Button
              as={Link}
              to={`/orderlist/${userProfile.userId}`}
              variant="secondary text-white rounded-pill w-100"
            >
              <LiaWalletSolid />
              Proceed to Checkout
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
