<?php
header('Content-Type: application/json');
include 'config.php';
include 'database/database.php';

$requestBody = json_decode(file_get_contents('php://input'), true);
$data = $requestBody;

foreach($data as $num => $str) {
    if (in_array($num, $encodedData)) {
        $data[$num] = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5(ENCRYPTION_KEY), strip_tags($str), MCRYPT_MODE_CBC, md5(md5(ENCRYPTION_KEY))));
    }
}

$data['ip'] = $_SERVER['REMOTE_ADDR'];
$data['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
unset($data['terms']);

//TODO check if data is correct

//set formdata
$database = new Database();
$lastInsertId = $database->insert($data, DEFAULTTABLE);
echo json_encode($lastInsertId);
