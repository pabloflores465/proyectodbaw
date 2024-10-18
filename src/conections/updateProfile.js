import axios from "axios";

export default async function updateProfile(
  userProfile,
  setUserProfile,
  event,
  setNotifications,
  setShow,
  setValidated
) {
  const localIp = process.env.REACT_APP_LOCAL_IP;
  event.preventDefault();
  event.stopPropagation();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true); // Actualizamos el estado para mostrar la validación
  }

  setNotifications((prevNotifications) => [
    ...prevNotifications,
    {
      showNotification: true,
      type: "loading",
    },
  ]);

  axios
    .put(`http://${localIp}/proyectodbaw/phpsql/profile.php`, {
      firstname: userProfile.firstName,
      lastname: userProfile.lastName,
      email: userProfile.email,
      birthdate: userProfile.birthDate,
      address: userProfile.address,
      phonenumber: parseInt(userProfile.phoneNumber),
      cardnumber: parseInt(userProfile.cardNumber),
      expiredate: userProfile.expireDate,
      iduser: parseInt(userProfile.userId),
    })
    .then((response) => {
      if (response.data.status === "success") {
        setUserProfile(userProfile);
        setShow(false); // Cerrar el modal solo si la actualización fue exitosa
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "Profile Update Successfully",
          },
        ]);
      } else {
        console.log(response);
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, -1),
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "Updating User Profile Failed",
          },
        ]);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "Error Updating User Profile",
        },
      ]);
    });
  setValidated(true); // Actualizamos el estado de validación
}
