import axios from "axios";

export default async function getLowStockProducts(
  categoryId,
  subcategoryId,
  setLowProducts,
  setLoading,
  setNotifications
) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  let url = `http://${localIp}/proyectodbaw/phpsql/Lproducts.php`;
  setLoading(true);
  if (categoryId) {
    url += `?category=${categoryId}`;
    if (subcategoryId) {
      url += `&subCategory=${subcategoryId}`;
    }
  }
  axios
    .get(url)
    .then((response) => {
      setLoading(false);
      setLowProducts(response.data);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "There Was An Error Getting the Users",
        },
      ]);
    });
}
