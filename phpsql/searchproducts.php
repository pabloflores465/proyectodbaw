<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo json_encode(["error" => "Invalid parameter"]);
    return;
}

$filters = $data->filters;
$searchTerm = $data->searchTerm;

// Initialize product array
$products = [];

// Base query
$query = "SELECT p.id_products, p.product_name, p.description, p.price, p.description, c.name FROM products p 
              LEFT JOIN product_category pc ON p.id_products = pc.id_products
              LEFT JOIN category c ON pc.id_category = c.id_category";

// Array to store WHERE clauses
$whereClauses = [];

if (is_array($filters)) {
    $nameFilter = $filters[0];
    $descriptionFilter = $filters[1];
    //$priceFilter = $filters[2];
    $categoryFilter = $filters[3];
    $enabled = $filters[4] === true ? 1 : 0;
    $noFilter = ($nameFilter === false && $descriptionFilter === false && $categoryFilter === false);

    // Add enabled/disabled filter
    $whereClauses[] = "p.enabled = ?";

    // Add search term filters if applicable
    if ($nameFilter || $noFilter) {
        $orClauses[] = "p.product_name LIKE ?";
    }
    if ($descriptionFilter || $noFilter) {
        $orClauses[] = "p.description LIKE ?";
    }
    /*if ($priceFilter || $noFilter) {
        $whereClauses[] = "p.price LIKE ?";
    }*/
    if ($categoryFilter || $noFilter) {
        $orClauses[] = "c.name LIKE ?";
    }

    // If there are any where clauses, append them to the query
    if (count($orClauses) > 0) {
        $query .= " WHERE " . implode(" AND ", $whereClauses) . " AND (" . implode(" OR ", $orClauses) . ")";
    } else {
        $query .= " WHERE " . implode(" AND ", $whereClauses);
    }

    // Prepare the statement
    if ($stmt = $connection->prepare($query)) {
        // Dynamically bind parameters
        $paramTypes = "i"; // 'i' for the enabled field (integer)
        $params = [$enabled];

        if ($nameFilter || $noFilter) {
            $paramTypes .= "s"; // 's' for string
            $params[] = "%" . $searchTerm . "%";
        }
        if ($descriptionFilter || $noFilter) {
            $paramTypes .= "s";
            $params[] = "%" . $searchTerm . "%";
        }
        /*if ($priceFilter || $noFilter) {
            $paramTypes .= "s";
            $params[] = "%" . $searchTerm . "%";
        }*/
        if ($categoryFilter || $noFilter) {
            $paramTypes .= "s";
            $params[] = "%" . $searchTerm . "%";
        }

        // Bind the parameters
        $stmt->bind_param($paramTypes, ...$params);

        // Execute the statement
        $stmt->execute();
        $result = $stmt->get_result();

        // Fetch all results
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }

        // Return the products in JSON format
        echo json_encode($products);
    } else {
        echo json_encode(["error" => "Failed to prepare the SQL statement"]);
    }
} else {
    echo json_encode(["error" => "Invalid parameter"]);
}

mysqli_close($connection);
?>