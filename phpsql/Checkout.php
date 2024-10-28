<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $id_order = intval($data->id_order);;

    // Comenzamos una transacción para asegurarnos de que ambas operaciones ocurran juntas
    $connection->begin_transaction();

    try {
        // Actualizar el estado de la orden
        $sql_update_state = "UPDATE order_dp 
                             SET state = 2
                             WHERE id_order = $id_order";
        if ($connection->query($sql_update_state) !== TRUE) {
            throw new Exception("Error al actualizar el estado en order_dp: " . $connection->error);
        }

        // Insertar nuevo estado en orders_states
        $sql_insert_state = "INSERT INTO orders_states (id_order, state, date, comment) 
                             VALUES ($id_order, 2, NOW(), 'Your order has been received and is being processed')";
        if ($connection->query($sql_insert_state) !== TRUE) {
            throw new Exception("Error al insertar en orders_states");
        }

        // Recalcular el total de la orden llamando a la función order_total
        $sql_get_total = "SELECT order_total($id_order) AS total";
        $result_total = $connection->query($sql_get_total);
        if ($result_total->num_rows > 0) {
            $row_total = $result_total->fetch_assoc();
            $total = $row_total['total'];
        } else {
            throw new Exception("Error al calcular el total de la orden");
        }

        // Obtener los valores de envío y mínimo de la tabla de configuración
        $sql_get_settings = "SELECT minimum, shipping FROM ordersettings WHERE id = 1";
        $result_settings = $connection->query($sql_get_settings);
        if ($result_settings->num_rows > 0) {
            $row_settings = $result_settings->fetch_assoc();
            $minimum = $row_settings['minimum'];
            $shipping = $row_settings['shipping'];
        } else {
            throw new Exception("Error al obtener configuraciones de envío");
        }

        // Calcular el total final con o sin envío
        $final_total = $total > $minimum ? $total : ($total + $shipping);

        // Actualizar el total en la tabla order_dp
        $sql_update_total = "UPDATE order_dp SET total = $final_total WHERE id_order = $id_order";
        if ($connection->query($sql_update_total) !== TRUE) {
            throw new Exception("Error al actualizar el total en order_dp");
        }

        // Confirmamos la transacción
        $connection->commit();
        echo json_encode(["success" => "Estado de la orden y total actualizados correctamente"]);

    } catch (Exception $e) {
        // Si algo falla, hacemos un rollback
        $connection->rollback();
        echo json_encode(["error" => $e->getMessage()]);
    }

    $connection->close();
}

?>

