<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getProduct($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getProduct($connection) {
    $pname = isset($_GET['product']) ? $_GET['product'] : '';

    $sql = "SELECT product_name, description, price FROM products WHERE product_name = '$pname'";


    $result = $connection->query($sql);


    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
    }
    echo json_encode($row);
    }


?>