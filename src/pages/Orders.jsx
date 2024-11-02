import React, { useContext, useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import getOrders from "../conections/getOrders";
import editOrders from "../conections/editOrders"; // Asegúrate de tener la función para actualizar el estado y comentario
import updateComment from "../conections/updateComment"; // Nueva función para actualizar solo el comentario
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "../components/LoadingState";
import { EditModeContext } from "../context/EditModeContext";
import { UserProfileContext } from "../context/UserProfileContext";
import ErrorPage from "./ErrorPage";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);
  const [comments, setComments] = useState({});
  const { userProfile } = useContext(UserProfileContext);

  // Manejar cambios en los comentarios
  const handleCommentChange = (event, orderIndex) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [orderIndex]: value,
    }));
    console.log("Updated comments:", comments);
  };

  // Función para actualizar el comentario
  const handleUpdateComment = (order, orderIndex) => {
    const comment = comments[orderIndex] || ""; // Usa el comentario escrito o vacío
    console.log(order.id_order, comment)

    updateComment(order.id_order, comment)
      .then(() => {
        // Notificar al usuario
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "Comment updated successfully!",
          },
        ]);
      })
      .catch((error) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "There was an error updating the comment.",
          },
        ]);
      });
  };

  // Función para avanzar al siguiente estado
  const handleAdvanceOrder = (order, orderIndex) => {
    const newState = parseInt(order.state) + 1; // Avanza al siguiente estado
    const comment = comments[orderIndex] || ""; // Usa el comentario escrito o vacío
    console.log(order.id_order, newState, comment)

    // Llamar a la API para actualizar el estado y el comentario en el servidor
    editOrders(parseInt(order.id_order), newState, comment, setNotifications)
      .then(() => {
        // Actualizar el estado localmente después de la respuesta exitosa
        let tempOrders = [...orders];
        tempOrders[orderIndex].state = newState;
        setOrders(tempOrders);

        // Notificar al usuario
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            showNotification: true,
            type: "success",
            headerMessage: "Success",
            bodyMessage: "Order state and comment updated successfully!",
          },
        ]);
      })
      .catch((error) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            showNotification: true,
            type: "error",
            headerMessage: "Error",
            bodyMessage: "There was an error updating the order state.",
          },
        ]);
      });
  };

  useEffect(() => {
    getOrders(setOrders, setLoading, setNotifications);
  }, []);

  if (userProfile.rol !== 2 && userProfile.rol !== 3) {
    return <ErrorPage />;
  }

  return (
    <>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <div style={{ height: "30px" }}></div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id Order</th>
                <th>State</th>
                {editMode ? (
                  <>
                    <th>Comment</th>
                    <th>Action</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIndex) => (
                <tr key={order.id_order}>
                  <td>{order.id_order}</td>
                  <td>
                    {parseInt(order.state) === 2
                      ? "Order Accepted"
                      : parseInt(order.state) === 3
                      ? "Preparing"
                      : parseInt(order.state) === 4
                      ? "On its way"
                      : parseInt(order.state) === 5
                      ? "Delivered"
                      : ""}
                  </td>
                  {editMode && (
                    <>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="Add a comment"
                          value={comments[orderIndex] || ""}
                          onChange={(event) => handleCommentChange(event, orderIndex)}
                        />
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleAdvanceOrder(order, orderIndex)}
                          disabled={parseInt(order.state) === 5}
                        >
                          Next State
                        </Button>
                        {parseInt(order.state) === 5 && (
                          <Button
                            variant="secondary"
                            onClick={() => handleUpdateComment(order, orderIndex)}
                          >
                            Update Comment
                          </Button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default Orders;
