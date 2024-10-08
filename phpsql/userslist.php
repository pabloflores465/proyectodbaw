<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getUsers($connection);
        break;
    case 'POST':
        createUser($connection);
        break;
    case 'PUT':
        updateUser($connection);
        break;
    case 'DELETE':
        deleteUser($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getUsers($connection) {
    $sql = "SELECT * FROM users";
    $result = $connection->query($sql);
    $users = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }

    echo json_encode($users);
}

function deleteUser($connection){
    $id = $_GET['id'];
    $sql = "DELETE FROM users WHERE id_user = $id";
    if ($connection -> query($sql)===FALSE){
        echo json_encode(["error"=> "No se pudo eliminar"]);
    }
}
?>