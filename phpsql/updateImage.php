<?php

require 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, GET");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    putImages($connection);
}
;

function putImages($connection)
{
    $productId = $_GET['productId'];
    $inputImage = json_decode(file_get_contents('php://input'), true);
    $image = isset($inputImage['image']) ? $inputImage['image'] : null;
    if ($image) {
        $imageData = base64_decode($image);

        $stmt = $connection->prepare("INSERT INTO products (id_products, image) VALUES (?, ?)");
        $stmt->bind_param("ib", $productId, $imageData);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Image inserted successfully']);
        } else {
            echo json_encode(['error' => 'Failed to insert image']);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'No image data found']);
    }
    ;

}
;
?>