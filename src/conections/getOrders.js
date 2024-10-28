import axios from "axios";

export default async function getOrders(setOrders, setLoading, setNotifications) {
  setLoading(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/orderlist.php`)
    .then((response) => {
      {console.log(response.data)}
      setOrders(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "There Was An Error Getting Orders",
        },
      ]);
    });
}
