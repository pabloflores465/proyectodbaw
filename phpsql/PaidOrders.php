<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getOrder($connection);
        break;
    case 'POST':
        createOrder($connection);
        break;
    case 'PUT':
        updateOrder($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getOrder($connection){
    $id_user = isset($_GET['id']) ? ($_GET['id']) : '';

    if ($id_user) {
        $sql = "SELECT os.id_order, os.date, os.state, os.comment
                FROM orders_states os
                JOIN order_dp od ON od.id_order = os.id_order
                WHERE od.id_user = $id_user AND od.state > 1
                ORDER BY os.id_order ASC";  // Ordenar por id_order en orden ascendente

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $orders = [];  // Crear un array vacío para almacenar las órdenes
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;  // Agregar cada fila al array de órdenes
            }
            echo json_encode($orders);  // Devolver el array completo como JSON
        } else {
            echo json_encode(["message" => "No hay órdenes para este usuario"]);
        }
    } else {
        echo json_encode(["error" => "El ID del usuario no fue proporcionado"]);
    }
}


?>