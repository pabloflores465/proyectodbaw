import axios from "axios";

export default async function getCategories(
  setCategories,
  setRecentCat = null,
  setNotifications = null
) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/categories.php`)
    .then((response) => {
      setCategories(response.data);
  
      if(setRecentCat){
        setRecentCat(response.data)
      }
    })
    .catch((error) => {
      console.log(error);
      if (setNotifications) {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "Error Getting Categories",
          },
        ]);
      }
    });
}
