import axios from "axios";

export default async function getHeader(setHeader, setNotifications = null) {
  axios
    .get("http://localhost/proyectodbaw/phpsql/footer.php")
    .then((response) => {
        console.log(response.data)
      setHeader(response.data)
      //console.log(footer)
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