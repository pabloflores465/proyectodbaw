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
    case 'POST':
        createProduct($connection);
        break;
    case 'PUT':
        updateProduct($connection);
        break;
    case 'DELETE':
        deleteProduct($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getCategories($connection) {
    $sql = "SELECT name, id_category, isfeatured FROM category";
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

/*function deleteProduct($connection){
    $id = $_GET['id'];
    $sql = "DELETE FROM products WHERE id_products = $id";
    if ($connection -> query($sql)===FALSE){
        echo json_encode(["error"=> "No se pudo eliminar"]);
    }
}

function updateProduct ($connection){
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"));
    $productname = $data->product_name;
    $description = $data ->description;
    $price = $data->price;
    $stock = $data->stock;

    $sql = "UPDATE products SET product_name = '$productname',description = '$description', price = $price, stock = $stock WHERE id_products = $id";
    if (mysqli_query($connection, $sql)) {
        echo json_encode(["message" => "succesful", "status"=>"success"]);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }
}
function createProduct($connection){
    $data = json_decode(file_get_contents("php://input"));

    $product_name = $data->name;
    $description = $data->desc;
    $price = $data->price;
    $stock = $data->stock;

    $sql="INSERT INTO products (product_name, description, price, stock, image, important) VALUES ('$product_name', '$description', $price, $stock, NULL, 0)";
    if (mysqli_query($connection, $sql)) {
        echo json_encode(["message" => "succesful", "status"=>"success"]);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }
}
*/
?>