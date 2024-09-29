<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$sql="SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = $connection->query($sql);

if ($result->num_rows > 0){

    echo json_encode(["message" => "succesful", "status"=>"success"]);

}else{
    echo json_encode(["message" => "no matching data", "status"=>"error"]);
}

$connection->close();

?>