import axios from "axios";

export default async function deleteUser(id, setNotifications, getUsers) {
  setNotifications((prevNotifications) => [
    ...prevNotifications,
    {
      showNotification: true,
      type: "loading",
    },
  ]);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .delete(`http://${localIp}/proyectodbaw/phpsql/userslist.php?id=${id}`)
    .then(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "success",
          headerMessage: "Success",
          bodyMessage: "User Deleted Successfully",
        },
      ]);
      getUsers();
    })
    .catch((error) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "There Was An Error Deleting the User",
        },
      ]);
      console.log(error);
    });
}
