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
$user = $result->fetch_assoc();

if ($result->num_rows > 0){

    echo json_encode(["message" => "succesful", "status"=>"success", "email"=>$user["email"],"rol"=>$user["rol"],"firstname"=>$user["first_name"],"lastname"=>$user["last_name"]]);

}else{
    echo json_encode(["message" => "no matching data", "status"=>"error"]);
}

$connection->close();

?>