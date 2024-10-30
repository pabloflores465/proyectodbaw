<?php
include('connection.php');

// Obtener el nombre del producto de la solicitud GET
$product_name = $_GET['product'];

// Escapar el nombre del producto para evitar inyecciones SQL
$product_name = mysqli_real_escape_string($connection, $product_name);

// Consulta para obtener el id del producto basado en el nombre
$sql_product = "SELECT id_products FROM products WHERE product_name = '$product_name'";
$result_product = $connection->query($sql_product);

// Verificar si la consulta fue exitosa
if ($result_product === false) {
    // Mostrar el error de MySQL si la consulta falla
    echo json_encode(["error" => "Error en la consulta SQL", "mysql_error" => mysqli_error($connection)]);
    exit();
}

// Verificar si se encontraron productos
if ($result_product->num_rows > 0) {
    $product = $result_product->fetch_assoc();
    $id_producto = $product['id_products'];

    // Consulta para obtener los comentarios del producto
    $sql_comments = "SELECT c1.id_comment, c1.comment, c1.id_prevcomment, c1.id_user, u.first_name, u.last_name
                     FROM comment c1
                     LEFT JOIN users u ON c1.id_user = u.id_user
                     WHERE c1.id_products = $id_producto
                     ORDER BY c1.id_prevcomment, c1.id_comment";
    $result_comments = $connection->query($sql_comments);

    // Verificar si la consulta de comentarios fue exitosa
    if ($result_comments === false) {
        echo json_encode(["error" => "Error en la consulta de comentarios", "mysql_error" => mysqli_error($connection)]);
        exit();
    }

    // Crear un array para almacenar los comentarios
    $comments = array();
    while ($row = $result_comments->fetch_assoc()) {
        $comments[] = $row;
    }

    // Devolver los comentarios en formato JSON
    echo json_encode($comments);
} else {
    echo json_encode(["error" => "Producto no encontrado"]);
}

// Cerrar la conexión
$connection->close();
?>
