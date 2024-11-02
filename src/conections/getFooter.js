import axios from "axios";

export default async function getFooter(setFooter,footer, setNotifications = null) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/footer.php`)
    .then((response) => {
        console.log(response.data)
      setFooter(response.data)
      console.log(footer)
    })
    .catch(() => {
      if (setNotifications) {
        setNotifications(
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
              showNotification: true,
              type: "error",
              headerMessage: "Error",
              bodyMessage: "There Was An Error Getting Footer",
            },
          ])
        );
      }
    });
}
