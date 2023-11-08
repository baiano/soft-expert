<?php
// handle cors from my localhost any port
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000"); // lock to localhost:3000
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
?>