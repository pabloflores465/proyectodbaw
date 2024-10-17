import axios from "axios";

export default async function getCartItems(
  userId,
  setCartItems,
  setLoading,
  setNotifications
) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  setLoading(true);
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/Orders.php?id_user=${userId}`)
    .then((response) => {
      setLoading(false);
      setCartItems(response.data);
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
}
