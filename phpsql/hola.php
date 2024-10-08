<?php
$servername = "localhost"; // o la IP de tu servidor de base de datos
$username = "root";  // usuario de la base de datos
$password = "";  // contraseña del usuario
$dbname = "DB_Petshop"; // nombre de la base de datos

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>

