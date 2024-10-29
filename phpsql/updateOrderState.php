<?php

include('connection.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");

$data = json_decode(file_get_contents("php://input"));

$id_order = $data->id_order;
$new_state = $data->state;
$comment = $data->comment;

// Actualizar el estado en la tabla `order_dp`
$updateOrderQuery = "UPDATE order_dp SET state = '$new_state' WHERE id_order = '$id_order'";
if (mysqli_query($connection, $updateOrderQuery)) {
    
    // Insertar una nueva entrada en `orders_states` con el nuevo estado y el comentario
    $insertOrderStateQuery = "INSERT INTO orders_states (id_order, state, date, comment) 
                              VALUES ('$id_order', '$new_state', NOW(), '$comment')";

    if (mysqli_query($connection, $insertOrderStateQuery)) {
        // Devolver una respuesta de éxito
        echo json_encode([
            "success" => true,
            "message" => "Order state and comment updated successfully!"
        ]);
    } else {
        // Devolver un error si falla la inserción en `orders_states`
        echo json_encode([
            "success" => false,
            "message" => "Failed to insert new state into orders_states: " . mysqli_error($connection)
        ]);
    }
} else {
    // Devolver un error si falla la actualización en `order_dp`
    echo json_encode([
        "success" => false,
        "message" => "Failed to update order state in order_dp: " . mysqli_error($connection)
    ]);
}

// Cerrar la conexión
mysqli_close($connection);
?>
