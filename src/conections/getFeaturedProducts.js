import axios from "axios";

export default async function getFeaturedProducts(
  categoryId,
  subcategoryId,
  setFeaturedProducts,
  setLoading,
  setNotifications
) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  let url = `http://${localIp}/proyectodbaw/phpsql/Fproducts.php`;
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
      setFeaturedProducts(response.data);
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
