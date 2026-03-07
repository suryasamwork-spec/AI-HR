<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Identify if we are on the local computer or the server
$is_local = ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1');

$host = 'localhost';

if ($is_local) {
    // LOCAL COMPUTER settings
    $user = 'root';
    $pass = 'Caldim@2026';
    $db = 'caldimwebsite';
} else {
    // BIGROCK SERVER settings - Hardcoded for reliability
    $user = 'caldina1_test';
    $pass = 'Caldim@2026';
    $db = 'caldina1_test';
}

mysqli_report(MYSQLI_REPORT_OFF);
$conn = @new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    die(json_encode(["success" => false, "message" => "DB Error: " . $conn->connect_error]));
}

return $conn;
?>