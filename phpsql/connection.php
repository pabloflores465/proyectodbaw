<?php

$servername="localhost";
$userame="root";
$password="";
$dbname="DB_Petshop";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$connection = new mysqli($servername, $userame, $password, $dbname);

if ($connection->connect_error){
    die("Failed Connection ". $connection->connect_error);
}




?>