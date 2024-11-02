<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getLowStockProducts($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getLowStockProducts($connection) {
    $settingsQuery = "SELECT minimum_days FROM ordersettings LIMIT 1";
    $settingsResult = $connection->query($settingsQuery);

    $minimumDate = 0;
    if ($settingsResult && $settingsResult->num_rows > 0) {
        $settingsRow = $settingsResult->fetch_assoc();
        $minimumDate = $settingsRow['minimum_days'];
    }

    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $category2 = isset($_GET['subCategory']) ? $_GET['subCategory'] : '';

    // Consulta principal para productos con stock menor o igual al mínimo
    $sql = "SELECT id_products, product_name, description, price, image, stock, important, enabled, date 
            FROM products 
            WHERE date >= DATE_SUB(NOW(), INTERVAL $minimumDate DAY) AND enabled =1 LIMIT 5 ";

    // Consultar las categorías asociadas
    $sql2 = "SELECT id_products, id_category FROM product_category";

    $result = $connection->query($sql);
    $result2 = $connection->query($sql2);
    $products = [];

    if (empty($category)) {
        // Obtener los productos
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $row['image'] = base64_encode($row['image'] ?? '');
                $row['categories'] = []; // Inicializar el array de categorías
                $products[$row['id_products']] = $row;
            }
        }

        // Obtener los IDs de las categorías para cada producto desde la tabla de relación
        if ($result2->num_rows > 0) {
            while($row = $result2->fetch_assoc()) {
                if (isset($products[$row['id_products']])) {
                    $products[$row['id_products']]['categories'][] = $row['id_category'];
                }
            }
        }

        // Filtrar productos que tengan todos los campos requeridos y al menos una categoría
        $filteredProducts = array_filter($products, function($product) {
            return isset($product['id_products'], $product['product_name'], $product['description'], $product['price'], $product['stock']) ;
        });

        // Devolver los productos como un array indexado
        echo json_encode(array_values($filteredProducts));
    } elseif (empty($category2)) {
        // Código para manejar cuando solo 'category' está definido
        $sql3 = "SELECT p.id_products, p.product_name, p.description, p.price,p.image,  p.stock, p.important, p.enabled, p.date 
                 FROM products p 
                 JOIN product_category pc ON p.id_products = pc.id_products 
                 JOIN category c ON pc.id_category = c.id_category 
                 WHERE c.name = '$category' AND date >= DATE_SUB(NOW(), INTERVAL $minimumDate DAY) 
                 GROUP BY p.id_products LIMIT 5";

        $result3 = $connection->query($sql3);
        $fproducts = [];

        if ($result3->num_rows > 0) {
            while($row = $result3->fetch_assoc()) {
                $row['image'] = base64_encode($row['image'] ?? '');
                $row['categories'] = [];
                $fproducts[$row['id_products']] = $row;
            }
        }

        // Obtener los IDs de las categorías
        $result4 = $connection->query($sql2);
        if ($result4->num_rows > 0) {
            while($row = $result4->fetch_assoc()) {
                if (isset($fproducts[$row['id_products']])) {
                    $fproducts[$row['id_products']]['categories'][] = $row['id_category'];
                }
            }
        }

        $filteredProducts = array_filter($fproducts, function($product) {
            return isset($product['id_products'], $product['product_name'], $product['description'], $product['price'], $product['stock']) ;
        });

        echo json_encode(array_values($filteredProducts));
    } else {
        // Código para manejar cuando 'category' y 'subCategory' están definidos
        $sql3 = "SELECT p.id_products, p.product_name, p.description, p.price,p.image, p.stock, p.important, p.enabled, p.date 
                 FROM products p 
                 JOIN product_category pc ON p.id_products = pc.id_products 
                 JOIN category c ON pc.id_category = c.id_category 
                 WHERE c.name IN ('$category', '$category2') AND date >= DATE_SUB(NOW(), INTERVAL $minimumDate DAY) 
                 GROUP BY p.id_products 
                 HAVING COUNT(DISTINCT c.id_category) = 2 LIMIT 5";

        $result3 = $connection->query($sql3);
        $fproducts = [];

        if ($result3->num_rows > 0) {
            while($row = $result3->fetch_assoc()) {
                $row['image'] = base64_encode($row['image'] ?? '');
                $row['categories'] = [];
                $fproducts[$row['id_products']] = $row;
            }
        }

        $result4 = $connection->query($sql2);
        if ($result4->num_rows > 0) {
            while($row = $result4->fetch_assoc()) {
                if (isset($fproducts[$row['id_products']])) {
                    $fproducts[$row['id_products']]['categories'][] = $row['id_category'];
                }
            }
        }

        $filteredProducts = array_filter($fproducts, function($product) {
            return isset($product['id_products'], $product['product_name'], $product['description'], $product['price'], $product['stock']);
        });

        echo json_encode(array_values($filteredProducts));
    }
}

?>
