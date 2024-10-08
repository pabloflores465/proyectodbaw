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
    case 'POST':
        createUser($connection);
        break;
    case 'PUT':
        updateUser($connection);
        break;
    case 'DELETE':
        deleteProduct($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getProduct($connection) {
    $sql = "SELECT id_products, product_name, description, price, stock FROM products";
    $result = $connection->query($sql);

    $products = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);
    } else {
        // Si no hay resultados
        echo json_encode(["message" => "No se encontraron productos"]);
        return;
    }
}

function deleteProduct($connection){
    $id = $_GET['id'];
    $sql = "DELETE FROM products WHERE id_products = $id";
    if ($connection -> query($sql)===FALSE){
        echo json_encode(["error"=> "No se pudo eliminar"]);
    }
}

?>