<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getHeader($connection);
        break;
    case 'PUT':
        updateHeader($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getHeader($connection) {
    $headerInfo = "SELECT * FROM header";
    $headerResult = $connection->query($headerInfo);
    $header = $headerResult->fetch_assoc();

    if($headerResult->num_rows > 0) {
        echo json_encode([
                "company"=>$header["company_name"],
                "image"=>$header["company_image"],
            ]
        );
    } else {
        echo json_encode(["error" => "No footer found"]);
    } 
}

function updateHeader($connection) {
    $headerData = json_decode(file_get_contents("php://input"));
    $updateHeader = "UPDATE header SET
        company_name = '{$headerData->company}',
        company_image = '{$headerData->image}'
    WHERE id_header = 1";

    if(mysqli_query($connection, $updateHeader)){
        echo json_encode(["success"=> "Categories Updated Succesfully"]);
    }else{
        echo json_encode(["error"=> "Error updating footer"]);
    }
}
?>