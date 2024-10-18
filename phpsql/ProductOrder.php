<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
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

?>