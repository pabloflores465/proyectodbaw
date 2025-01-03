<?php
include 'connection.php';
function loadEnv($file) {
    if (!file_exists($file)) {
        throw new Exception("El archivo de entorno ($file) no existe.");
    }

    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        // Ignorar comentarios
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        // Separar clave y valor
        list($key, $value) = explode('=', $line, 2);

        // Eliminar espacios en blanco y comillas
        $key = trim($key);
        $value = trim($value, '"');

        // Establecer las variables de entorno
        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

// Cargar las variables del archivo .env.local
loadEnv(__DIR__ . '/../.env.local');

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
$config = require 'data.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$mail = new PHPMailer(true);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "PUT"){

function generateToken($length = 32) {
return bin2hex(random_bytes($length));
}
$token = generateToken();

$data = json_decode(file_get_contents("php://input"));

$firstname = $data->firstname;
$lastname = $data->lastname;
$email = $data->email;
$password = $data->password;
$phonenumber = $data->phonenumber;
$birthdate = $data->birthdate;
$address = $data->address;
$cardnumber = $data->cardnumber;
$expdate = $data->expdate;

$localIp = getenv('REACT_APP_LOCAL_IP');
$url = 'http://' . $localIp . ':3000/loginComfirm/' . $token;
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

Thank you for choosing D&P Petshop. We look forward to serving you and your pets!<br> <a href='$url' style='color:blue; text-decoration:underline;'>Click here to login</a> <br>

Best regards,<br>
The D&P Petshop Team
";
$mail->send();
}catch(Exception $e){
    echo "No se pudo enviar el correo";
}

$sql = "INSERT INTO users (first_name, last_name, email, password, birth_date, address, phone_number, rol, active, card_number, expire_date, last_connection, token, notified) VALUES ('$firstname', '$lastname', '$email', '$password', '$birthdate', '$address', $phonenumber, 1, 0, $cardnumber, '$expdate', NOW(), '$token', 0)";
if (mysqli_query($connection, $sql)) {
    echo json_encode(["message" => "succesful", "status"=>"success"]);
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}
}
?>