import axios from "axios";

export default async function getCategories(setCategories) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/categories.php`)
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
