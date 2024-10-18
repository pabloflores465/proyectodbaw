<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getTotal($connection);
        break;
}

$connection->close();

function getTotal($connection) {
    $id_user = isset($_GET['id']) ? $_GET['id'] : '';
    $sql = "SELECT total FROM order_dp WHERE id_user = $id_user AND state=1";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(["total" => $row['total']]);
    }
}

?>