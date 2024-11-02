import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Card, Form, Container } from "react-bootstrap"; // Agregar Card
import { FaShoppingCart } from "react-icons/fa";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { useParams } from "react-router";
import LoadingState from "../components/LoadingState";
import axios from "axios";
import { UserProfileContext } from "../context/UserProfileContext";

function ProductDetail() {
  const { windowWidth } = useContext(WindowWidthContext);
  const params = useParams(); // params.id es el nombre del producto
  const [data, setData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { userProfile } = useContext(UserProfileContext);
  const localIp = process.env.REACT_APP_LOCAL_IP;
  const [amount, setAmount] = useState();

  // Estados para comentarios
  const [comments, setComments] = useState([]); // Inicializar con array vacío
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null); // Para respuestas

  // Manejar la creación de un pedido
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `http://${localIp}/proyectodbaw/phpsql/Orders.php`,
        {
          id_user: userProfile.userId,
          id_product: data.id_products,
          amount: amount,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };

  // Obtener datos del producto
  const handleData = async (productName) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/Dproducts.php?product=${productName}`;
      setLoadingProducts(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error al cargar producto:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Obtener los comentarios del producto por nombre
  const handleGetComments = async (productName) => {
    try {
      let url = `http://${localIp}/proyectodbaw/phpsql/GetComments.php?product=${productName}`;
      const response = await axios.get(url);

      // Si la respuesta no es un array, inicializar comments como un array vacío
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        setComments([]); // En caso de que la respuesta no sea un array
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      setComments([]); // En caso de error, inicializar con array vacío
    } finally {
      setLoadingComments(false);
    }
  };

  // Manejar el envío de un nuevo comentario o respuesta
  const handleSubmitComment = async () => {
    console.log(userProfile.userId, params.id, newComment, replyTo)
    try {
      const response = await axios.post(`http://${localIp}/proyectodbaw/phpsql/AddComment.php`, {
        id_user: userProfile.userId,
        id_products: params.id, // Aquí estamos usando el nombre del producto
        comment: newComment,
        id_prevcomment: replyTo,
      });

      console.log("Comentario enviado: ", response.data);
      setNewComment(""); // Limpiar el campo
      setReplyTo(null);   // Resetear el estado de respuesta
      handleGetComments(params.id); // Recargar comentarios
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  // Renderizar los comentarios y respuestas usando Card de React-Bootstrap
  const renderComments = (comments, parentId = null) => {
    return comments
      .filter(comment => comment.id_prevcomment === parentId)
      .map(comment => (
        <div key={comment.id_comment} style={{ marginLeft: parentId ? '20px' : '0px', borderBottom: "1px solid #ccc", padding: "10px" }}>
          <strong>{comment.first_name} {comment.last_name}:</strong> {comment.comment}
          <div>
            {renderComments(comments, comment.id_comment)} {/* Renderizar respuestas */}
          </div>
          {userProfile.rol !== 0 && ( // Mostrar el botón solo si el rol es diferente de 0
          <Button 
            variant="link" 
            onClick={() => setReplyTo(comment.id_comment)} 
            className="mt-2"
          >
            Responder
          </Button>
        )}
        </div>
      ));
  };

  useEffect(() => {
    handleData(params.id); // params.id es el nombre del producto
    handleGetComments(params.id); // Obtener comentarios cuando cargue el producto
  }, [params.id]);

  return (
    <>
      <div className={`d-flex justify-content-center mb-4`} style={{marginTop:"100px"}}>
          <div>
            <div className={`d'flex ${windowWidth < 1000 ? "flex-row":"flex-column"} justify-content-center align-items-center border-bottom mb-2`}>
              <Image
                src={`data:image/jpeg;base64,${data.image}`}
                rounded
                height={480}
                width={640}
                className="me-2 mb-2"
              />
              <div className="d-flex flex-column">
                <strong>{data.product_name}</strong>
                <strong>Description:</strong>
                <div
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    maxHeight: "100px",
                    width: "200px",
                    overflowY: "auto",
                  }}
                >
                  {data.description}
                </div>
                <strong>Price: Q{data.price}</strong>
                <a>
                  Stock: {data.stock == 0 ? <a>No disponible</a> : data.stock}{" "}
                </a>
              </div>
              {data.stock > 0 ? (
                <div>
                  <Card className="p-2 shadow">
                    <Form.Group>
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        name="amount"
                        type="number"
                        className="mb-2"
                        onKeyDown={(e) => {
                          if (
                            e.key === "-" ||
                            e.key === "e" ||
                            e.key === "+" ||
                            e.key === "."
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          let value = parseInt(e.target.value);
                          if (value > 0) {
                            if (value > data.stock) {
                              e.target.value = data.stock;
                              value = data.stock;
                            }
                          } else {
                            e.target.value = "";
                          }
                          setAmount(value);
                        }}
                      />
                    </Form.Group>

                    <Button
                      variant="secondary text-white rounded-pill w-100"
                      onClick={() => handleCreate()}
                    >
                      <FaShoppingCart /> Add to Cart {console.log(data)}
                    </Button>
                  </Card>
                </div>
              ) : (
                <a>Not available</a>
              )}
            </div>
            
            {/* Sección de comentarios con scroll usando Card */}
            <div>
              <h3>Comentarios:</h3>
              {loadingComments ? (
                <LoadingState />
              ) : (
                <Card style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
                  <Card.Body>
                    {comments.length > 0  ? (
                      renderComments(comments)
                    ) : (
                      <p>No hay comentarios para este producto.</p>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>

            {userProfile.rol !== 0 ? (
            <div style={{ marginTop: "20px" }}>
              <Form>
                <Form.Group controlId="commentText">
                  <Form.Label>{replyTo ? "Responder a comentario" : "Nuevo comentario"}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                  />
                </Form.Group>
                <Button 
                  variant="danger rounded-pill text-white" 
                  className="mt-2" 
                  onClick={handleSubmitComment}
                >
                  <strong>{replyTo ? "Responder" : "Comentar"}</strong>
                </Button>
                {replyTo && (
                  <Button 
                    variant="secondary rounded-pill text-white" 
                    className="mt-2 ms-2" 
                    onClick={() => setReplyTo(null)}
                  >
                    <strong>Cancelar respuesta</strong>
                  </Button>
                )}
              </Form>
            </div>
             ) : null }
          </div>
      </div>
    </>
  )
}

export default ProductDetail;
