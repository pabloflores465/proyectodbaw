<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");


$data = json_decode(file_get_contents("php://input"));

$firstname = $data->firstname;
$lastname = $data->lastname;
$email = $data->email;
$birthdate = $data->birthdate;
$address = $data ->address;
$phonenumber = $data->phonenumber;
$cardnumber = $data->cardnumber;
$expiredate = $data->expiredate;
$iduser = $data->iduser;
$password = isset($data->password) && !empty($data->password) ? mysqli_real_escape_string($connection, $data->password) : null;

// Si se proporciona una contraseña, actualizarla
if ($password) {
    $passwordSql = ", password = '$password'";
} else {
    $passwordSql = "";
}

// Construir la consulta SQL
$sql = "UPDATE users 
        SET first_name = '$firstname', 
            last_name = '$lastname', 
            email = '$email', 
            birth_date = '$birthdate', 
            address = '$address', 
            phone_number = $phonenumber, 
            card_number = $cardnumber, 
            expire_date = '$expiredate'
            $passwordSql
        WHERE id_user = $iduser";
if (mysqli_query($connection, $sql)) {
    echo json_encode(["message" => "succesful", "status"=>"success"]);
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}
?>