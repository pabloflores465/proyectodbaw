<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir PHPMailer
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

// Configuración desde un archivo separado
$config = require 'data.php';

// Configuración de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

// Leer el cuerpo de la solicitud
$input = file_get_contents('php://input');
$data = json_decode($input);

// Variables para depuración
$errorMessages = [];

if ($data && isset($data->cartItems) && isset($data->email)) {
    $cartItems = $data->cartItems;
    $userEmail = $data->email;
} else {
    $errorMessages[] = "Datos inválidos o incompletos en la solicitud.";
}

// Crear una instancia de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['email']; // Tu correo
    $mail->Password = $config['password']; // Tu contraseña
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Asegúrate de usar 'ssl' o 'tls' correctamente
    $mail->Port = 465; // Puerto SMTP

    // Configuración del remitente y destinatario
    $mail->setFrom($config['email'], 'Nombre Remitente');
    $mail->addAddress($userEmail);

    // Configuración del correo
    $mail->isHTML(true);
    $mail->Subject = 'Details of Items in Cart';

    // Generar el cuerpo del correo con los datos de cartItems
    $body = '<h2>Details of Items in Cart</h2>';
    $body .= '<table border="1" cellpadding="5" cellspacing="0">';
    $body .= '<tr><th>Product</th><th>Amount</th><th>Total Price</th></tr>';

    foreach ($cartItems as $item) {
        $body .= '<tr>';
        $body .= '<td>' . htmlspecialchars($item->product_name) . '</td>';
        $body .= '<td>' . htmlspecialchars($item->amount) . '</td>';
        $body .= '<td>$' . htmlspecialchars($item->total_product_price) . '</td>';
        $body .= '</tr>';
    }
    $body .= '</table>';

    $mail->Body = $body;

    //$mail->send();
    echo json_encode(["success" => true, "message" => "Correo enviado correctamente."]);
} catch (Exception $e) {
    $errorMessages[] = "Error al enviar el correo: " . $mail->ErrorInfo;
}

// Mostrar mensajes de error si los hay
if (!empty($errorMessages)) {
    echo json_encode(["success" => false, "errors" => $errorMessages]);
}
?>
