import axios from "axios";

export default async function getCategories(
  setCategories,
  setRecentCat = null,
  setNotifications = null
) {
  if (setNotifications) {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        showNotification: true,
        type: "loading",
      },
    ]);
  }
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/categories.php`)
    .then((response) => {
      if (setNotifications) {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "Categories Got Successful",
          },
        ]);
      }
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
