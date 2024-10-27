<?php
include 'connection.php';

$sql = "SELECT token FROM users";
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
?>