<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;
$token = $data->token;

$sql="SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = $connection->query($sql);
$user = $result->fetch_assoc();

if ($result->num_rows > 0) {
    if ($user['token'] === $token && $user['active'] == 1) {
        echo json_encode(["status" => "already"]);
    } 
    elseif ($user['token'] === $token && $user['active'] == 0) {
        $update_sql = "UPDATE users SET active = 1 WHERE email = '$email' AND password = '$password' AND token = '$token'";
        $update_result = $connection->query($update_sql);
        echo json_encode(["status" => "successful"]);
    } 
    else {
        echo json_encode(["message" => "token mismatch", "status" => "error"]);
    }
} else {
    echo json_encode(["message" => "no matching data", "status" => "error"]);
}

$connection->close();

?>