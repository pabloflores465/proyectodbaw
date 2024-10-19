<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'PUT':
        updatePOrder($connection);
        break;
    case 'DELETE':
        deletePOrder($connection);
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$connection->close();

function deletePOrder($connection){
    $id = $_GET['id'];
    $idproduct = $_GET['product'];
    $sql2 = "DELETE o FROM order_detail o
            JOIN order_dp dp ON o.id_order=dp.id_order
            WHERE o.id_product=$idproduct AND dp.id_user=$id";
    
    if ($connection->query($sql2) === TRUE) {
        echo json_encode(["success" => "Producto eliminado correctamente"]);

        // Obtener el id_order basado en id_user
        $sql_get_order = "SELECT id_order FROM order_dp WHERE id_user = $id AND state = 1";
        $result = $connection->query($sql_get_order);
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $id_order = $row['id_order'];
            
            $sql_state = "INSERT INTO orders_states (id_order, state, date) VALUES ($id_order, 1, NOW())";
            $result_state = $connection->query($sql_state);
            // Recalcular el total
            $sql_update_total = "UPDATE order_dp 
                                 SET total = order_total($id_order)
                                 WHERE id_order = $id_order";
            
            if ($connection->query($sql_update_total) === TRUE) {
                echo json_encode(["success" => "Total de la orden actualizado correctamente"]);
            } else {
                echo json_encode(["error" => "Error al actualizar el total de la orden", "details" => $connection->error]);
            }
        } else {
            echo json_encode(["error" => "No se encontró la orden para este usuario"]);
        }
    } else {
        echo json_encode(["error" => "Error al eliminar el producto", "details" => $connection->error]);
    }

}

function updatePOrder($connection){
    $id_user = $_GET['id'];  // ID del usuario
    $id_product = $_GET['product'];  // ID del producto
    $new_amount = $_GET['amount'];  // Nueva cantidad
    
    // Actualizar la cantidad del producto en la orden
    $sql_update = "UPDATE order_detail od
                   JOIN order_dp dp ON od.id_order = dp.id_order
                   SET od.amount = $new_amount, od.total_product_price=NULL
                   WHERE dp.id_user = $id_user AND od.id_product = $id_product AND dp.state = 1";
    
    if ($connection->query($sql_update) === TRUE) {
        $sql_get_order = "SELECT dp.id_order FROM order_dp dp WHERE dp.id_user = $id_user AND dp.state = 1";
        $result = $connection->query($sql_get_order);
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $id_order = $row['id_order'];
            
            $sql_update_total = "UPDATE order_dp 
                                 SET total = order_total($id_order)
                                 WHERE id_order = $id_order";
            
            if ($connection->query($sql_update_total) === TRUE) {
                echo json_encode(["success" => "Cantidad actualizada y total recalculado correctamente"]);
            } else {
                echo json_encode(["error" => "Error al actualizar el total", "details" => $connection->error]);
            }
        }
    } else {
        echo json_encode(["error" => "Error al actualizar la cantidad", "details" => $connection->error]);
    }
}

?>