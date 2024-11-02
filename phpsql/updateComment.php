<?php

include('connection.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");

$data = json_decode(file_get_contents("php://input"));


$id_order =$data->id_order;
$comment =$data->comment;


// Actualizar solo el comentario en la tabla `orders_states`
$updateCommentQuery = "UPDATE orders_states SET comment = '$comment' WHERE id_order = '$id_order' AND state = 5";

if (mysqli_query($connection, $updateCommentQuery)) {
    echo json_encode([
        "success" => true,
        "message" => "Comment updated successfully!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update comment: " . mysqli_error($connection)
    ]);
}

// Cerrar la conexión
mysqli_close($connection);
?>
