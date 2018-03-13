<?php
//error_reporting(E_ALL);
//ini_set('display_errors','On');
require_once '../config.php';
require_once 'database.php';

if (!isset($_COOKIE['xyz'])) {
	die();
}

$score = (int) $_COOKIE['xyz'];

//add ip and additional field
$data = $_POST;
$data['ip'] = $_SERVER['REMOTE_ADDR'];
$data['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
$data['score'] = $score;
$database = new Database();
$id = $database->insert($data, DEFAULTTABLE);
