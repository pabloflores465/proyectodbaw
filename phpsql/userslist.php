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


function updateUser($connection){
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"));
    $firstname = $data->first_name;
    $lastname = $data->last_name;
    $email = $data->email;
    $birthdate = $data->birth_date;
    $address = $data ->address;
    $phonenumber = $data->phone_number;
    $rol = $data->rol;
    $active = $data->active;
    $cardnumber = $data->card_number;
    $expiredate = $data->expire_date;
    $lastconnection = $data->last_connection;

    $sql="UPDATE users SET first_name = '$firstname', email = '$email', birth_date = '$birthdate', address = '$address', phone_number = $phonenumber, rol=$rol, active=$active, card_number = $cardnumber, expire_date = '$expiredate', last_connection = '$lastconnection' WHERE users.id_user = $id";
    if (mysqli_query($connection, $sql)) {
        echo json_encode(["message" => "succesful", "status"=>"success"]);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }

}

?>