import React, { useContext, useState } from "react";
import {
  Button,
  Table,
  Form,
  Dropdown,
  DropdownButton,
  DropdownToggle,
  DropdownMenu,
} from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import getUsers from "../conections/getUsers";
import deleteUser from "../conections/deleteUser";
import { NotificationContext } from "../context/NotificationContext";
import LoadingState from "../components/LoadingState";
import { EditModeContext } from "../context/EditModeContext";
import editUser from "../conections/editUser";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);

  const handleInput = (event, userIndex) => {
    const { name, value } = event.target;
    let temp = [...users];
    temp[userIndex] = { ...users[userIndex], [name]: value };

    setUsers(temp);
  };

  const handleValue = (name, value, userIndex) => {
    let temp = [...users];
    temp[userIndex] = { ...users[userIndex], [name]: value };
    console.log(value);
    setUsers(temp);
  };

  useEffect(() => {
    getUsers(setUsers, setLoading, setNotifications);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingState />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id User</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Current Rol</th>
              <th>Active</th>
              <th>Card Number</th>
              <th>Expire Date</th>
              <th>Last Connection</th>
              {editMode ? <th>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {users.map((user, userIndex) => (
              <tr key={user.id_user}>
                {editMode ? (
                  <>
                    <td>{user.id_user}</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="first_name"
                        defaultValue={user.first_name}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="last_name"
                        defaultValue={user.last_name}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="birth_date"
                        defaultValue={user.birth_date}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="address"
                        defaultValue={user.address}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        defaultValue={user.phone_number}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
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
                      <Form.Check
                        defaultChecked={parseInt(user.active) ? true : false}
                        onChange={(e) =>
                          handleValue(
                            "active",
                            String(e.target.checked ? 1 : 0),
                            userIndex
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="card_number"
                        defaultValue={user.card_number}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="expire_date"
                        defaultValue={user.expire_date}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="last_connection"
                        defaultValue={user.last_connection}
                        onChange={(event) => handleInput(event, userIndex)}
                      />
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
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.id_user}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.birth_date}</td>
                    <td>{user.address}</td>
                    <td>{user.phone_number}</td>
                    {console.log(user.rol)}
                    {parseInt(user.rol) === 1 ? (
                      <td>Client</td>
                    ) : parseInt(user.rol) === 2 ? (
                      <td>Employee</td>
                    ) : parseInt(user.rol) === 3 ? (
                      <td>Admin</td>
                    ) : (
                      <td></td>
                    )}
                    {parseInt(user.active) === 1 ? (
                      <td>Active</td>
                    ) : (
                      <td>Inactive</td>
                    )}
                    <td>{user.card_number}</td>
                    <td>{user.expire_date}</td>
                    <td>{user.last_connection}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UsersList;
