import axios from "axios";

export default async function putHeader(header, setNotifications = null) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  if (setNotifications) {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        showNotification: true,
        type: "loading",
      },
    ]);
  }
  console.log(footer)
  axios
    .put(`http://${localIp}/proyectodbaw/phpsql/header.php`, header)
    .then(() => {
      if (setNotifications) {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "Footer Update Successfully",
          },
        ]);
      }
    })
    .catch((error) => {
      console.log(error);
      if (setNotifications) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "There Was An Error Updating Footer",
          },
        ]);
      }
    });
}
