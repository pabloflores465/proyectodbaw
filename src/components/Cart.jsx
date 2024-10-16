import React, {useState, useContext, useEffect} from "react";
import { Button,  Dropdown, Image,  } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { UserProfileContext } from "../context/UserProfileContext";
import LoadingState from "../components/LoadingState";
import { LiaWalletSolid } from "react-icons/lia";

export default function Cart() {
  const [data, setData] = useState([]);
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  let temp = userProfile;
  const [loadingProducts, setLoadingProducts] = useState(true);

  const handleData = async (id) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/Orders.php?id_user=${id}`;
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
    handleData(temp.userId);
  }, []);





  const CustomToggle = React.forwardRef(({ onClick },ref) => (
    <Button
      className="text-white rounded-pill"
      variant="link"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    ><FaShoppingCart size={"2rem"} /></Button>
  ));

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <div className="container overflow-auto w-100" style={{
            maxHeight: '200px' 
          }}>
          {loadingProducts ? (
            <LoadingState />
          ) : (
            data.length > 0 ? (
              data.map((item, index) => (
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
                    <Button variant="link">
                      <IoCloseSharp size={"1.5rem"} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )
            
          )}
          <Button variant="secondary text-white rounded-pill w-100">
                      <LiaWalletSolid />Proceed to Checkout
                      </Button>
        </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
