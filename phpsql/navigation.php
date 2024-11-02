<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header("Content-Type: application/json");

// Incluir el archivo de conexión
include 'connection.php';

// Determinar el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        handlePostRequest();
        break;

    case 'GET':
        handleGetRequest();
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

// Función para manejar las solicitudes POST
function handlePostRequest() {
    global $connection;

    // Leer los datos enviados en el cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    $id_category = $data['id_category'];
    $id_sub = $data['id_sub'];
    $is_checked = $data['is_checked'];

    // Verificar si los datos son válidos
    if (!isset($id_category, $id_sub, $is_checked)) {
        echo json_encode(["error" => "Datos incompletos"]);
        exit();
    }

    // Escapar los valores para evitar inyecciones SQL
    $id_category = $connection->real_escape_string($id_category);
    $id_sub = $connection->real_escape_string($id_sub);

    // Preparar la consulta SQL
    if ($is_checked) {
        // Si se seleccionó, insertar el registro si no existe
        $query = "INSERT IGNORE INTO navigation (id_category, id_sub) VALUES ('$id_category', '$id_sub')";
    } else {
        // Si se deseleccionó, eliminar el registro
        $query = "DELETE FROM navigation WHERE id_category = '$id_category' AND id_sub = '$id_sub'";
    }

    // Ejecutar la consulta y verificar el resultado
    if ($connection->query($query) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Error al ejecutar la consulta: " . $connection->error]);
    }
}

// Función para manejar las solicitudes GET
function handleGetRequest() {
    global $connection;

    // Preparar la consulta para obtener las categorías marcadas
    $query = "SELECT id_category, id_sub FROM navigation";
    $result = $connection->query($query);

    $markedCategories = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $markedCategories[] = $row;
        }
    }

    // Devolver las categorías marcadas como JSON
    echo json_encode($markedCategories);
}

// Cerrar la conexión
$connection->close();
?>
