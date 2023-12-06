<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    http_response_code(405); 
    echo json_encode('Method Not Allowed');
    return;
}
include_once '../db/Database.php';
include_once '../models/Bookmark.php'; 

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id) || !isset($data->title) || !isset($data->link)) {
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error: Missing required parameters (id, title, and link) in the JSON body.')
    );
    return;
}

$bookmark->setId($data->id);
$bookmark->setTitle($data->title);
$bookmark->setLink($data->link);

if ($bookmark->update()) {
    echo json_encode(
        array('message' => 'A bookmark was updated successfully.')
    );
} else {
    echo json_encode(
        array('message' => 'Error: A bookmark was not updated.')
    );
}
?>
