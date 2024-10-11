<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getProduct($connection);
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

function getProduct($connection) {
    // Consultar los productos
    $sql = "SELECT id_products, product_name, description, price, stock FROM products";
    
    // Consultar los IDs de las categorías asociadas al producto desde la tabla de relación
    $sql2 = "SELECT id_products, id_category 
             FROM product_category";

    $result = $connection->query($sql);
    $result2 = $connection->query($sql2);

    $products = [];

    // Obtener los productos
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Iniciar el array de categorías vacío para cada producto
            $products[$row['id_products']] = $row;
            $products[$row['id_products']]['categories'] = [];
        }
    }

    // Obtener los IDs de las categorías para cada producto desde la tabla de relación
    if ($result2->num_rows > 0) {
        while($row = $result2->fetch_assoc()) {
            // Añadir los IDs de las categorías al array de categorías del producto correspondiente
            $products[$row['id_products']]['categories'][] = $row['id_category'];
        }
    }

    // Devolver los productos como un array indexado (reindexar)
    echo json_encode(array_values($products));
}

function deleteProduct($connection){
    $id = $_GET['id'];
    $sql2 = "DELETE FROM product_category WHERE id_products = $id";
    
    if ($connection->query($sql2) === TRUE) {
        $sql = "DELETE FROM products WHERE id_products = $id";
        if ($connection->query($sql) === TRUE) {
            echo json_encode(["success" => "Producto eliminado correctamente"]);
        } else {
            echo json_encode(["error"=> "Error al eliminar de products"]);
        }
    } else {
        echo json_encode(["error"=> "Error al eliminar de product_category"]);
    }
}

function updateProduct ($connection){
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"));
    $productname = $data->product_name;
    $description = $data ->description;
    $price = $data->price;
    $stock = $data->stock;
    $id_categories = $data->category; 

    $sql = "UPDATE products SET product_name = '$productname', description = '$description', price = $price, stock = $stock WHERE id_products = $id";
    
    if (mysqli_query($connection, $sql)) {
        $sql_delete = "DELETE FROM product_category WHERE id_products = $id";
        mysqli_query($connection, $sql_delete);
        foreach ($id_categories as $category_id) {
            $sql_category = "INSERT INTO product_category (id_products, id_category) VALUES ($id, $category_id)";
            if (!mysqli_query($connection, $sql_category)) {
                echo "Error al insertar en product_categories: " . mysqli_error($connection);
            }
        }
        echo json_encode(["message" => "Product and categories updated successfully", "status" => "success"]);
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
    $id_categories = $data->category; 
    
    $sql = "INSERT INTO products (product_name, description, price, stock, image, important) 
            VALUES ('$product_name', '$description', $price, $stock, NULL, 0)";
    
    if (mysqli_query($connection, $sql)) {

        $id_products = mysqli_insert_id($connection);


        foreach ($id_categories as $category_id) {
            $sql_category = "INSERT INTO product_category (id_products, id_category) 
                             VALUES ($id_products, $category_id)";
            if (!mysqli_query($connection, $sql_category)) {
                echo "Error al insertar en product_categories: " . mysqli_error($connection);
            }
        }

        echo json_encode(["message" => "Producto registrado exitosamente", "status"=>"success"]);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }
}

?>