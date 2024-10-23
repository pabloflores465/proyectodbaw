<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getFooter($connection);
        break;
    case 'PUT':
        updateFooter($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getFooter($connection)
{
    $footerInfo = "SELECT * FROM footer";
    $footerResult = $connection->query($footerInfo);

    $footer = $footerResult->fetch_assoc();

    if ($footerResult->num_rows > 0) {
        echo json_encode(
    [
                "title1" => $footer["title_1"], 
                "title2" => $footer["title_2"], 
                "title3" => $footer["title_3"], 
                "title4" => $footer["title_4"], 
                "line11" => $footer["1line_1"], 
                "line12" => $footer["1line_2"], 
                "line13" => $footer["1line_3"],
                "line21"=> $footer["2line_1"],
                "line22"=> $footer["2line_2"],
                "line23"=> $footer["2line_3"],
                "line31"=> $footer["3line_1"],
                "line32"=> $footer["3line_2"],
                "line33"=> $footer["3line_3"],
                "line41"=> $footer["4line_1"],
                "line42"=> $footer["4line_2"],
                "line43"=> $footer["4_line3"],
            ]
        );
    } else {
        echo json_encode(["error" => "No footer found"]);
    }
}

function updateFooter ($connection){
    $footerData = json_decode(file_get_contents("php://input"));
    $updateFooter = "UPDATE footer SET 
        title_1 = '{$footerData->title1}', 
        title_2 = '{$footerData->title2}',
        title_3 = '{$footerData->title3}',
        title_4 = '{$footerData->title4}',
        1line_1 = '{$footerData->line11}',
        1line_2 = '{$footerData->line12}',
        1line_3 = '{$footerData->line13}',
        2line_1 = '{$footerData->line21}',
        2line_2 = '{$footerData->line22}',
        2line_3 = '{$footerData->line23}',
        3line_1 = '{$footerData->line31}',
        3line_2 = '{$footerData->line32}',
        3line_3 = '{$footerData->line33}',
        4line_1 = '{$footerData->line41}',
        4line_2 = '{$footerData->line42}',
        4_line3 = '{$footerData->line43}'
    WHERE id_footer = 1";

    if(mysqli_query($connection, $updateFooter)){
        echo json_encode(["success"=> "Categories Updated Succesfully"]);
    }else{
        echo json_encode(["error"=> "Error updating footer"]);
    }
}

?>