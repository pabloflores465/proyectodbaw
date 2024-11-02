import axios from 'axios';

export default async function editOrders(id_order, newState, comment, setNotifications) {
  console.log(id_order, newState, comment)

  setNotifications((prevNotifications) => [
    ...prevNotifications,
    {
      showNotification: true,
      type: "loading",
    },
  ]);

  const localIp = process.env.REACT_APP_LOCAL_IP; 
  axios
    .post(`http://${localIp}/proyectodbaw/phpsql/updateOrderState.php`, {
      id_order: parseInt(id_order),
      state: newState,
      comment: comment,
    })
    .then(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),
        {
          showNotification: true,
          type: "success",
          headerMessage: "Success",
          bodyMessage: "Order state updated successfully!",
        },
      ]);
    })
    .catch((error) => {
      console.log(error);
     setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, -1),         {
          showNotification: true,
          type: "error",
          headerMessage: "Error",
          bodyMessage: "There was an error updating the order state.",
        },
      ]);
      console.log(error); 
    });
}
