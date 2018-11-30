<?php
$GLOBALS['hostOop'] = 'localhost';
$GLOBALS['userOop'] = 'root';
$GLOBALS['pwOop'] = '';
$GLOBALS['databaseOop'] = 'esgar';

function runQuery($query){
	$db = new mysqli($GLOBALS['hostOop'],$GLOBALS['userOop'],$GLOBALS['pwOop'],$GLOBALS['databaseOop']);
	$db->query('set names utf8mb');
	$result = $db->query($query);
	mysqli_close($db);
	return $result;
}


?>