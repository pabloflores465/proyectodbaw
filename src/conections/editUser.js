import axios from "axios";

export default async function editUser(id, user, setNotifications) {
  setNotifications((prevNotifications) => [
    ...prevNotifications,
    {
      showNotification: true,
      type: "loading",
    },
  ]);

  const localIp = process.env.REACT_APP_LOCAL_IP;
  axios
    .put(`http://${localIp}/proyectodbaw/phpsql/userslist.php?id=${id}`, user)
    .then(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "success",
          headerMessage: "Success",
          bodyMessage: "User Edited Successfully",
        },
      ]);
    })
    .catch((error) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "There Was An Error Editing the User",
        },
      ]);
      console.log(error);
    });
}
