import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

function UsersList({ show, setShow }) {
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setShow(false);
    setEditRowId(null);
  };

  const handleData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/proyectodbaw/phpsql/userslist.php"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost/proyectodbaw/phpsql/userslist.php?id=${id}`
      );
      handleData();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleEdit = (item) => {
    setEditRowId(item.id_user);
    setFormData({ ...item });
    console.log(formData.rol);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.rol);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost/proyectodbaw/phpsql/userslist.php?id=${id}`,
        formData
      );
      handleData();
      setEditRowId(null);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Modal
      centered
      className="text-white shadow"
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header
        className="bg-primary rounded-top pt-1 pb-2 pe-3 ps-3"
        closeButton
      >
        <Modal.Title>Users List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>id_user</th>
              <th>first_name</th>
              <th>last_name</th>
              <th>email</th>
              <th>birth_date</th>
              <th>address</th>
              <th>phone_number</th>
              <th>current_rol</th>
              <th>active</th>
              <th>card_number</th>
              <th>expire_date</th>
              <th>last_connection</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id_user}>
                {editRowId === item.id_user ? (
                  <>
                    <td>{item.id_user}</td>
                    <td>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="rollling stones"
                        value={formData.rol}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="active"
                        value={formData.active}
                        onChange={() => {
                          handleInput();
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="card_number"
                        value={formData.card_number}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="expire_date"
                        value={formData.expire_date}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="last_connection"
                        value={formData.last_connection}
                        onChange={handleInput}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleSave(item.id_user)}
                      >
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.id_user}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.birth_date}</td>
                    <td>{item.address}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.rol}</td>
                    <td>{item.active}</td>
                    <td>{item.card_number}</td>
                    <td>{item.expire_date}</td>
                    <td>{item.last_connection}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item.id_user)}
                      >
                        Delete
                      </Button>
                      <Button variant="danger" onClick={() => handleEdit(item)}>
                        Edit
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default UsersList;
