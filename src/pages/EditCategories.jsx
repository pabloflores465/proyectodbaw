import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../context/UserProfileContext';
import { useNavigate } from 'react-router';
import { Button, Table, Form, Container } from "react-bootstrap";
import axios from 'axios';

function EditCategories() {
  const { userProfile } = useContext(UserProfileContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});
  const [name, setName]=useState("");

  const handleData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/proyectodbaw/phpsql/categories2.php"
      );
      setData(response.data);
      
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost/proyectodbaw/phpsql/categories2.php?id=${id}`
      );
      handleData();
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
    console.log(formData)
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost/proyectodbaw/phpsql/categories2.php?id=${id}`,
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

  useEffect(() => {
    if (userProfile.rol !== 2 && userProfile.rol !== 3) {
      navigate('/error');
    }
  }, [userProfile, navigate]);

  return (
    <>
      {userProfile.rol === 2 || userProfile.rol === 3 ? (
        <Container fluid className="p-3">
          <div className="table-responsive">
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
      ) : <h1>You can't access to this page</h1>}
    </>
  );
}

export default EditCategories;
