<?php
include 'connection.php';

function loadEnv($file) {
    if (!file_exists($file)) {
        throw new Exception("El archivo de entorno ($file) no existe.");
    }

    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value, '"');

        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

loadEnv(__DIR__ . '/../.env.local');

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
$config = require 'data.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        handlePostRequest($connection, $config);
        break;

    case "GET":
        handleGetRequest($connection);
        break;
    case "PUT":
            handleForgotten($connection);
            break;
    default:
        echo json_encode(["message" => "Method not allowed", "status" => "error"]);
        break;
}

function handlePostRequest($connection, $config) {
    function generateToken($length = 32) {
        return bin2hex(random_bytes($length));
    }

    $token = generateToken();
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;

    $query = "SELECT id_user, first_name, last_name FROM users WHERE email = '$email'";
    $result = mysqli_query($connection, $query);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $id_user = $user['id_user'];
        $firstname = $user['first_name'];
        $lastname = $user['last_name'];

        $localIp = getenv('REACT_APP_LOCAL_IP');
        $url = 'http://' . $localIp . ':3000/passreset/' . $token;

        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $config['email'];
            $mail->Password = $config['password'];
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            $mail->setFrom('bebeztrada901@gmail.com');
            $mail->addAddress($email);
            $mail->isHTML(true);
            $mail->Subject = 'D&P Petshop - Password Reset Request';
            $mail->Body = "
                Hi $firstname $lastname,<br><br>
                You requested to reset your password. Click the link below to proceed:<br>
                <a href='$url' style='color:blue; text-decoration:underline;'>Reset Password</a><br><br>
                Best regards,<br>
                The D&P Petshop Team
            ";
            $mail->send();

            // Insertar el token en la tabla forgotten
            $sql = "INSERT INTO forgotten (id_user, token, used) VALUES ($id_user, '$token', 0)";
            if (mysqli_query($connection, $sql)) {
                echo json_encode(["message" => "Token generated and email sent.", "status" => "success"]);
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($connection);
            }
        } catch (Exception $e) {
            echo "Failed to send email";
        }
    } else {
        echo json_encode(["message" => "Email not found.", "status" => "error"]);
    }
}

function handleGetRequest($connection) {
    $sql = "SELECT token, used, id_user FROM forgotten";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $tokens = array();
        while ($row = $result->fetch_assoc()) {
            $tokens[] = $row;
        }
        echo json_encode($tokens);
    } else {
        echo json_encode([]);
    }

    $connection->close();
}

function handleForgotten($connection){
    $id = $_GET['id_user'];
    $password = $_GET['password'];
    $token = $_GET['token'];
    $sql = "UPDATE users SET password = '$password' WHERE id_user = $id";
    if (mysqli_query($connection, $sql)) {
        $sql2= "UPDATE forgotten SET used = 1 WHERE token = '$token'";
        if (mysqli_query($connection, $sql2)) {
            echo json_encode(["message" => "Password changed", "status" => "success"]);
        } else {
            echo "Error updating token: " . $sql2 . "<br>" . mysqli_error($connection);
        }
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }
}
?>
