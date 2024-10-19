import axios from "axios";

export default async function updateImage(productId, image, setNotifications = null) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .put(`http://${localIp}/proyectodbaw/phpsql/updateImage.php/${productId}`, {image})
    .then(() => {})
    .catch((error) => console.log(error));
}
