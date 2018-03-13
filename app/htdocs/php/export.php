<?php
error_reporting(E_ALL);
ini_set('display_errors','On');
include 'config.php';
include 'database/database.php';

header('Content-type: text/csv');
header('Content-Disposition: attachment; filename="export_' . date('Y-m-d') . '.csv"');

$database = new Database();

$database->query('SHOW COLUMNS FROM ' . DEFAULTTABLE);
$data = $database->resultset();

$columns = array();
for ($i = 0; $i < count($data); $i++) {
	$columns[] = $data[$i]['Field'];
}

echo implode(';', $columns);
echo "\n";

$database->query('SELECT * FROM ' . DEFAULTTABLE);
$data = $database->resultset();

foreach($data as $num => $row) {
	$singleRow = array();
	foreach($row as $col => $str) {
		$tempStr = '';
		if (in_array($col, $encodedData)) {
			if (strlen($str) !== 0) {
				$tempStr = utf8_decode(decrypt($str));
			}
		} else {
			$tempStr = utf8_decode($str);
		}
		$singleRow[] = '"' . $tempStr . '"';
	}
	echo implode(';', $singleRow) . "\n";
}
