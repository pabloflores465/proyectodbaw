import React, { useContext, useState } from "react";
import {
  Button,
  Table,
  Form
} from "react-bootstrap";
import { useEffect } from "react";
import getOrders from "../conections/getOrders";
import editOrders from "../conections/editOrders"; // Asegúrate de tener la función para guardar los datos
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "../components/LoadingState";
import { EditModeContext } from "../context/EditModeContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);
  const [comments, setComments] = useState({}); // Estado para almacenar comentarios

  // Manejar cambios en los comentarios
  const handleCommentChange = (event, orderIndex) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [orderIndex]: value,
    }));
  };

  // Función para avanzar al siguiente estado y guardar el comentario
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
                {editMode ? <><th>Comment</th><th>Action</th></> : null}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIndex) => (
                <tr key={order.id_order}>
                {order.state > 1 ? (
                  <>
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
                  </>
                ) : <></>
                  }
                  {editMode && (
                    <>
                    {order.state > 1 ? (
                      <>
                    <td>
                    <Form.Control
                      type="text"
                      placeholder="Add a comment"
                      value={comments[orderIndex] || ""}
                      onChange={(event) => handleCommentChange(event, orderIndex)}
                      disabled={parseInt(order.state) === 5} // Si el estado es 5 (Delivered), no se puede editar
                    />
                  </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleAdvanceOrder(order, orderIndex)}
                        disabled={parseInt(order.state) === 5} // Deshabilitar si ya está en el estado 'Delivered'
                      >
                        Next State
                      </Button>
                    </td>
                    </>
                ) : <></>
                  }
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
