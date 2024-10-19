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
        $total = $row['total'];
    }

    $sql_settings = "SELECT minimum, shipping FROM ordersettings LIMIT 1";
    $result_settings = $connection->query($sql_settings);

    if ($result_settings->num_rows > 0) {
        $settings = $result_settings->fetch_assoc();
        $minimum = $settings['minimum'];
        $shipping = $settings['shipping'];
    }

    $sql_order = "SELECT id_order FROM order_dp WHERE id_user = $id_user AND state = 1";
    $result2 = $connection->query($sql_order);

    if ($result2->num_rows > 0) {
        $order = $result2->fetch_assoc();
        $id_order = $order['id_order'];
    }

    echo json_encode([
        "total" => $total,
        "minimum" => $minimum,
        "shipping" => $shipping,
        "id_order" => $id_order
    ]);
}

?>