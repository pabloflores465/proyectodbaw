import axios from "axios";

export default async function signUp(user, event, confirm, setNotifications) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  setNotifications((prevNotifications) => [
    ...prevNotifications,
    {
      showNotification: true,
      type: "loading",
    },
  ]);
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (confirm === true) {
    axios
      .put(`http://${localIp}/proyectodbaw/phpsql/signup.php`, user)
      .then(() => {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "User Register successful",
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "Error While Register",
          },
        ]);
      });
  } else {
    console.log("not log in");
    setNotifications((prevNotifications) => [
      ...prevNotifications.slice(0, -1),
      {
        showNotification: true,
        type: "error",
        headerMessage: "Error",
        bodyMessage: "Passwords doesn't match",
      },
    ]);
  }
}
