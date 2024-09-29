<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

$data = json_decode(file_get_contents("php://input"));

$firstname = $data->firstname;
$lastname = $data->lastname;
$email = $data->email;
$password = $data->password;
$phonenumber = $data->phonenumber;
$birthdate = $data->birthdate;
$address = $data->address;
$cardnumber = $data->cardnumber;
$expdate = $data->expdate;

$sql = "INSERT INTO users (first_name, last_name, email, password, birth_date, address, phone_number, rol, state, card_number, expire_date, last_connection) VALUES ('$firstname', '$lastname', '$email', '$password', '$birthdate', '$address', $phonenumber, 1, 1, $cardnumber, '$expdate', '2024-09-28')";
if (mysqli_query($connection, $sql)) {
    echo json_encode(["message" => "succesful", "status"=>"success"]);
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}

?>