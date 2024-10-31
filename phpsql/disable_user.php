<?php
include 'connection.php';
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$config = require 'data.php';

function notifyDisabledUsers($connection, $config) {
    $query = "SELECT email, first_name FROM users WHERE active = 0 AND notified = 1";
    $result = mysqli_query($connection, $query);

    if (mysqli_num_rows($result) > 0) {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $config['email'];    
        $mail->Password = $config['password']; 
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom($config['email']); 

        while ($row = mysqli_fetch_assoc($result)) {
            $mail->clearAddresses();
            $mail->addAddress($row['email']);
            $mail->isHTML(true);
            $mail->Subject = 'Account Disabling Notification';
            $mail->Body = "
                Hello {$row['first_name']},<br><br>
                Your account has been disabled due to inactivity for over a year.<br>
                If you would like to reactivate your account, please contact our support team.<br><br>
                Best regards,<br>
                D&P Petshop Support Team
            ";


            try {
                $mail->send();
                echo "Correo enviado a {$row['email']}<br>";

                // Marca al usuario como notificado después de enviar el correo
                $updateQuery = "UPDATE users SET notified = 2 WHERE email = '{$row['email']}'";
                mysqli_query($connection, $updateQuery);
            } catch (Exception $e) {
                echo "Error al enviar el correo a {$row['email']}: ", $mail->ErrorInfo, "<br>";
            }
        }
    }
}

notifyDisabledUsers($connection, $config);
?>
