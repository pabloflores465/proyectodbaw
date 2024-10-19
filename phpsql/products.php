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
    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $category2 = isset($_GET['subCategory']) ? $_GET['subCategory'] : '';
    // Consultar los productos
    $sql = "SELECT id_products, product_name, description, price, stock, important, image FROM products";
    
    // Consultar los IDs de las categorías asociadas al producto desde la tabla de relación
    $sql2 = "SELECT id_products, id_category 
             FROM product_category";

    $sql3 = "SELECT p.id_products, p.product_name, p.description, p.price, p.stock, p.image FROM products p JOIN product_category pc ON p.id_products = pc.id_products JOIN category c ON pc.id_category = c.id_category WHERE c.name IN ('$category', '$category2') GROUP BY p.id_products HAVING COUNT(DISTINCT c.id_category) = ";


    $sql4 = "SELECT p.id_products, c.id_category 
            FROM products p 
            JOIN product_category pc ON p.id_products = pc.id_products 
            JOIN category c ON pc.id_category = c.id_category 
            WHERE p.id_products IN (SELECT id_products FROM products_by_category WHERE name = '$category' )";

    $result = $connection->query($sql);
    $result2 = $connection->query($sql2);
    $result4 = $connection->query($sql4);

    $products = [];
    $fproducts = [];
    if (empty($category)){
    // Obtener los productos
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $row['image'] = base64_encode($row['image'] ?? '');
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
}elseif(empty($category2)){
    $sql3 .= "1";
    $result3 = $connection->query($sql3);
    if ($result3->num_rows > 0) {
        while($row = $result3->fetch_assoc()) {
            $row['image'] = base64_encode($row['image'] ?? '');
            // Iniciar el array de categorías vacío para cada producto
            $fproducts[$row['id_products']] = $row;
            $fproducts[$row['id_products']]['categories'] = [];
        }
    }
    $result4 = $connection->query($sql4);

    // Obtener los IDs de las categorías para los productos seleccionados
    if ($result4->num_rows > 0) {
        while($row = $result4->fetch_assoc()) {
            // Añadir los IDs de las categorías al array de categorías del producto correspondiente
            $fproducts[$row['id_products']]['categories'][] = $row['id_category'];
        }
    }
    echo json_encode(array_values($fproducts));
}elseif($category2){
    $sql3 .= "2";
    $result3 = $connection->query($sql3);
    if ($result3->num_rows > 0) {
        while($row = $result3->fetch_assoc()) {
            $row['image'] = base64_encode($row['image'] ?? '');
            // Iniciar el array de categorías vacío para cada producto
            $fproducts[$row['id_products']] = $row;
            $fproducts[$row['id_products']]['categories'] = [];
        }
    }
    $result4 = $connection->query($sql4);

    // Obtener los IDs de las categorías para los productos seleccionados
    if ($result4->num_rows > 0) {
        while($row = $result4->fetch_assoc()) {
            // Añadir los IDs de las categorías al array de categorías del producto correspondiente
            $fproducts[$row['id_products']]['categories'][] = $row['id_category'];
        }
    }
    $filteredProducts = [];

    foreach ($fproducts as $product) {
        // Verificar si el producto tiene todos los campos necesarios y más de una categoría
        if (isset($product['id_products'], $product['product_name'], $product['description'], $product['price'], $product['stock']) && count($product['categories']) > 1) {
            $filteredProducts[] = [
                'id_products' => $product['id_products'],
                'product_name' => $product['product_name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'categories' => $product['categories'] // Mantener las categorías
            ];
        }
}

echo json_encode(array_values($filteredProducts));

}

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
    $description = $data->description;
    $price = $data->price;
    $stock = $data->stock;
    $id_categories = $data->category;
    $featuredItem = isset($data->featuredItem) ? $data->featuredItem : 0; 

    $sql = "UPDATE products SET product_name = '$productname', description = '$description', price = $price, stock = $stock, important = $featuredItem WHERE id_products = $id";
    
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