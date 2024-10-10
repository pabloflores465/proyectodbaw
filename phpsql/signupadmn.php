<?php

include 'connection.php';
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
$config = require 'data.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

$data = json_decode(file_get_contents("php://input"));

$firstname = $data->firstname;
$lastname = $data->lastname;
$email = $data->email;
$password = $data->password;
$birthdate = $data->birthdate;
$rol = $data->rol;

try{
    $mail->isSMTP();
    $mail->Host='smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['email'];
    $mail->Password=$config['password'];
    $mail->SMTPSecure='ssl';
    $mail->Port=465;
    $mail->setFrom('bebeztrada901@gmail.com');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Welcome to D&P Petshop - Your Account is Successfully Created!';
    $mail->Body="
    Hi $firstname $lastname,<br><br>
    
    Welcome to D&P Petshop! We are excited to have you join our pet-loving community.<br><br>
    
    Your account has been successfully created. Now, you're just a step away from exploring our wide variety of pet products.<br><br>
    
    Feel free to log in at any time and start browsing through our catalog. If you have any questions, don't hesitate to contact us!<br><br>
    
    Thank you for choosing D&P Petshop. We look forward to serving you and your pets!<br><br>
    
    Best regards,<br>
    The D&P Petshop Team
    ";
    $mail->send();
    }catch(Exception $e){
        echo "No se pudo enviar el correo";
    }


$sql = "INSERT INTO users (first_name, last_name, email, password, birth_date, rol, active, last_connection) VALUES ('$firstname', '$lastname', '$email', '$password', '$birthdate',$rol, 1, '2024-09-28')";
if (mysqli_query($connection, $sql)) {
    echo json_encode(["message" => "succesful", "status"=>"success"]);
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}

?>