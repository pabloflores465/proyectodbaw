<?php
include('connection.php');

error_reporting(E_ALL); 
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);

// Configuración de CORS y cabeceras
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");

// Obtener los datos desde el cuerpo de la solicitud HTTP en formato JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true); // Decodificar el JSON como array

// Verificar si los valores existen en el array decodificado
$id_user = isset($data['id_user']) ? $data['id_user'] : null;
$product_name = isset($data['id_products']) ? $data['id_products'] : null; // El nombre del producto
$comment = isset($data['comment']) ? $data['comment'] : null;
$id_prevcomment = isset($data['id_prevcomment']) && $data['id_prevcomment'] !== null ? $data['id_prevcomment'] : 'NULL';

// Validar que los datos requeridos no sean nulos
if ($id_user === null || $product_name === null || $comment === null) {
    echo json_encode(["status" => "error", "message" => "Faltan datos para agregar el comentario"]);
    exit();
}

// Obtener el id del producto a partir del nombre
$sql_product = "SELECT id_products FROM products WHERE product_name = '$product_name'";
$result_product = $connection->query($sql_product);

if ($result_product && $result_product->num_rows > 0) {
    $product = $result_product->fetch_assoc();
    $id_producto = $product['id_products'];

    // Verificar si $id_prevcomment es NULL o un número y ajustar el SQL dinámicamente
    if ($id_prevcomment === 'NULL') {
        $sql = "INSERT INTO comment (id_user, id_products, comment, id_prevcomment) 
                VALUES ($id_user, $id_producto, '$comment', NULL)";
    } else {
        $sql = "INSERT INTO comment (id_user, id_products, comment, id_prevcomment) 
                VALUES ($id_user, $id_producto, '$comment', $id_prevcomment)";
    }

    if ($connection->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Comentario agregado"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al agregar comentario", "mysql_error" => mysqli_error($connection)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Producto no encontrado"]);
}

// Cerrar la conexión
$connection->close();
?>
