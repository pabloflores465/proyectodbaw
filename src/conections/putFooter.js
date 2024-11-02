import axios from "axios";

export default async function putFooter(footer, setNotifications = null) {
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
    .put(`http://${localIp}/proyectodbaw/phpsql/footer.php`, footer)
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
