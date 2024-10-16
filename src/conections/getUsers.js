import axios from "axios";

export default async function getUsers(setUsers, setLoading, setNotifications) {
  setLoading(true);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .get(`http://${localIp}/proyectodbaw/phpsql/userslist.php`)
    .then((response) => {
      setUsers(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "There Was An Error Getting the Users",
        },
      ]);
    });
}
