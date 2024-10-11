<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getCategories($connection);
        break;
    case 'PUT':
        updateCategory($connection);
        break;
    case 'DELETE':
        deleteCategory($connection);
        break;
}

$connection->close();

function getCategories($connection) {
    $sql = "SELECT * FROM category";
    $result = $connection->query($sql);

    $category = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $category[] = $row;
        }
        echo json_encode($category);
    } else {
        // Si no hay resultados
        echo json_encode(["message" => "No se encontraron productos"]);
        return;
    }
}

function updateCategory ($connection){
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;

    $sql = "UPDATE category SET name = '$name' WHERE id_category = $id";
    if (mysqli_query($connection, $sql)) {
        echo json_encode(["message" => "succesful", "status"=>"success"]);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }
}

function deleteCategory($connection){
    $id = $_GET['id'];
    $sql2 = "DELETE FROM product_category WHERE id_category = $id";
    
    if ($connection->query($sql2) === TRUE) {
        $sql = "DELETE FROM category WHERE id_category = $id";
        if ($connection->query($sql) === TRUE) {
            echo json_encode(["success" => "Categoria eliminado correctamente"]);
        } else {
            echo json_encode(["error"=> "Error al eliminar de category"]);
        }
    } else {
        echo json_encode(["error"=> "Error al eliminar de product_category"]);
    }
}