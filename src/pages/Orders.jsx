import React, { useContext, useState } from "react";
import {
  Button,
  Table,
  Form,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "react-bootstrap";
import { useEffect } from "react";
import getOrders from "../conections/getOrders";
import deleteUser from "../conections/deleteUser";
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "../components/LoadingState";
import { EditModeContext } from "../context/EditModeContext";
import editUser from "../conections/editUser";
import { FaUserPlus } from "react-icons/fa6";
import NewUserAdmin from "./NewUserAdmin";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);

  const handleInput = (event, ordersIndex) => {
    const { name, value } = event.target;
    let temp = [...orders];
    temp[ordersIndex] = { ...orders[ordersIndex], [name]: value };

    setOrders(temp);
  };

  const handleValue = (name, value, ordersIndex) => {
    let temp = [...orders];
    temp[ordersIndex] = { ...orders[ordersIndex], [name]: value };
    console.log(value);
    setOrders(temp);
  };

  useEffect(() => {
    getOrders(setOrders, setLoading, setNotifications);
  }, []);

  return (
    <>
    {console.log(orders)}
      {loading ? (
        <LoadingState />
      ) : (
        <>
        <div style={{height:'30px'}}></div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id Order</th>
              <th>State</th>
              {editMode ? <th>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, ordersIndex) => (
              <tr key={order.id_order}>
                {editMode ? (
                  <>
                    <td>{order.id_order}</td>
                    <td>{parseInt(order.state) === 2 ? (
                      <td>Order Accepted</td>
                    ) : parseInt(order.state) === 3 ? (
                      <td>Preparing</td>
                    ) : parseInt(order.state) === 4 ? (
                      <td>On its way</td>
                    ) : parseInt(order.state) === 5 ? (
                      <td>Delivered</td>
                    ): (
                      <td></td>
                    )}</td>
                    {/*<td>
                      <Dropdown>
                        <DropdownToggle
                          variant="secondary"
                          style={{ color: "white" }}
                        >
                          {users[userIndex].rol === "1"
                            ? "Client"
                            : users[userIndex].rol === "2"
                            ? "Employee"
                            : users[userIndex].rol === "3"
                            ? "Admin"
                            : "Select Role"}
                        </DropdownToggle>
                        <DropdownMenu>
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() => handleValue("rol", "1", userIndex)}
                          >
                            Client
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="2"
                            onClick={() => handleValue("rol", "2", userIndex)}
                          >
                            Employee
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="3"
                            onClick={() => handleValue("rol", "3", userIndex)}
                          >
                            Admin
                          </Dropdown.Item>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                    <td>
                      <Button
                        variant="secondary text-white rounded-pill w-100 m-1"
                        onClick={() =>
                          editUser(
                            user.id_user,
                            users[userIndex],
                            setNotifications
                          )
                        }
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary text-white rounded-pill w-100 m-1"
                        onClick={() =>
                          deleteUser(user.id_user, setNotifications, () =>
                            getUsers(setUsers, setLoading, setNotifications)
                          )
                        }
                      >
                        Delete
                      </Button>
                    </td>*/}
                  </>
                ) : (
                  <>
                    <td>{order.id_order}</td>
                    {parseInt(order.state) === 2 ? (
                      <td>Order Accepted</td>
                    ) : parseInt(order.state) === 3 ? (
                      <td>Preparing</td>
                    ) : parseInt(order.state) === 4 ? (
                      <td>On its way</td>
                    ) : parseInt(order.state) === 5 ? (
                      <td>Delivered</td>
                    ): (
                      <td></td>
                    )}
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
