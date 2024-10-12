import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import { useNavigate } from "react-router";
import { Button, Table, Form, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { NotificationContext } from "../context/NotificationContext";

function EditCategories() {
  const { userProfile } = useContext(UserProfileContext);
  const navigate = useNavigate();
  const {setNotifications} = useContext(NotificationContext)

  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});
  const [name, setName]=useState("");
  const [showModal, setShowModal] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const localIp = process.env.REACT_APP_LOCAL_IP;
  const handleData = async () => {
    try {
      const response = await axios.get(
        `http://${localIp}/proyectodbaw/phpsql/categories2.php`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const nice = (result)=>{
    setNotifications((prevNotifications) => [
      ...prevNotifications.slice(0, -1),
      {
        showNotification: true,
        type: "success",
        headerMessage: "Success",
        bodyMessage: "Category Deleted",
      },
    ]);
  }

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://${localIp}/proyectodbaw/phpsql/categories2.php?id=${id}`
      );
      handleData();
      window.location.reload()
      nice(result)

    
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (item) => {
    setEditRowId(item.id_category);
    setFormData({ ...item });
    
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://${localIp}/proyectodbaw/phpsql/categories2.php?id=${id}`,
        formData
      );
      handleData();
      setEditRowId(null);
      window.location.reload()
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post(`http://${localIp}/proyectodbaw/phpsql/categories2.php`,{
        name : name
      });
      if (response.data.status==="success") {
        console.log("Registrado");
        handleData();
        window.location.reload()
      }else{
        console.log("no registrado");
      }
    }catch(error){
      console.error('Error: ',error);
    }
  };


  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    if (userProfile.rol !== 2 && userProfile.rol !== 3) {
      navigate("/error");
    }
  }, [userProfile, navigate]);

  return (
    <>
      {userProfile.rol === 2 || userProfile.rol === 3 ? (
        <Container fluid className="p-3" style={{marginTop:'40px'}}>
          <div className="table-responsive">
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary text-white rounded-pill mb-2"
                onClick={handleOpenModal}
                style={{ width: "auto" }}
              >
                Add Category
              </Button>
            </div>
            <Modal
              centered
              className="text-white shadow"
              show={showModal}
              onHide={handleCloseModal}
            >
              <Modal.Header
                className="bg-primary rounded-top pt-1 pb-2 pe-3 ps-3"
                closeButton
              >
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  onSubmit={handleSubmit}
                  className="ps-1 pe-1 overflow-auto"
                >
                  <Form.Group className="mb-3" controlId="validateName">
                    <Form.Label className="text-success">Category name</Form.Label>
                    <Form.Control
                      required
                      placeholder="Category"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="secondary text-white rounded-pill w-100"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <Table striped bordered hover className="w-100">
              <thead>
                <tr>
                  <th>id_category</th>
                  <th>name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id_category}>
                    {editRowId === item.id_category ? (
                      <>
                        <td>{item.id_category}</td>
                        <td>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Button
                            variant="secondary text-white rounded-pill w-100"
                            className="w-100 mb-1"
                            onClick={() => handleSave(item.id_category)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary text-white rounded-pill w-100"
                            className="w-100"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.id_category}</td>
                        <td>{item.name}</td>
                        <td>
                          <Button
                            variant="secondary text-white rounded-pill w-100"
                            className="w-100 mb-1"
                            onClick={() => handleDelete(item.id_category)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="secondary text-white rounded-pill w-100"
                            className="w-100"
                            onClick={() => handleEdit(item)}
                          >
                            Edit {console.log(data.id_category)}
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      ) : (
        <h1>You can't access to this page</h1>
      )}
    </>
  );
}

export default EditCategories;
