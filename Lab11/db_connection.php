<?php

// WARNING: NEVER DO THIS IN PRODUCTION
$servername = "localhost";
$username = "root";
$password = "1234";
$database = "todo_db";

$conn = new mysqli($servername, $username, $password, $database);

// check the connection
if ($conn->connect_error) {
    // exit and kill this process
    echo "Failed to connect to database!";
    die("Connection failed: ");
}

?>