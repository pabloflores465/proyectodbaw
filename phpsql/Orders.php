<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getOrder($connection);
        break;
    case 'POST':
        createOrder($connection);
        break;
    case 'PUT':
        updateOrder($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function getOrder($connection){
    $id_user = isset($_GET['id_user']) ? $_GET['id_user'] : '';

    if ($id_user) {
        $sql = "
            SELECT p.image, p.product_name, p.description, od.amount, od.total_product_price 
            FROM order_detail od
            INNER JOIN products p ON od.id_product = p.id_products
            INNER JOIN order_dp o ON od.id_order = o.id_order
            WHERE o.id_user = $id_user AND o.state = 1
        ";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $cart = [];
            while ($row = $result->fetch_assoc()) {
                $row['image'] = base64_encode($row['image'] ?? '');
                $cart[] = $row;
            }
            echo json_encode($cart);
        } else {
            echo json_encode(["message" => "No hay productos en el carrito"]);
        }
    } else {
        echo json_encode(["error" => "El id del usuario no fue proporcionado"]);
    }
}

function createOrder($connection) {
    $data = json_decode(file_get_contents("php://input"));
    $id_user = $data->id_user;
    $id_products = $data->id_product;
    $amount = $data->amount;

    $sql_check_order = "SELECT id_order FROM order_dp WHERE id_user = $id_user AND state = 1";
    $result_check = $connection->query($sql_check_order);

    if ($result_check->num_rows > 0) {
        $row = $result_check->fetch_assoc();
        $id_order = $row['id_order'];
    } else {
        $sql= "INSERT INTO order_dp (id_user, state) VALUES ($id_user, 1)";
        if ($connection->query($sql) === TRUE) {
            $id_order = $connection->insert_id;
        } else {
            echo json_encode(["message" => "Error al crear la orden", "error" => $connection->error]);
            return;
        }
    }
    
    $sql2 = "INSERT INTO order_detail (id_order, id_product, amount, total_product_price) VALUES ($id_order, $id_products, $amount, NULL)";
    $result = $connection->query($sql2);

    if($result === TRUE ){
        echo json_encode(["message" => "Pedido creado con éxito"]);
    } else {
        echo json_encode(["message" => "Error al agregar detalles del pedido"]);
    }


    echo json_encode(["message" => "succesful"]);
    }


?>