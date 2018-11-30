<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
	include_once "query.php";


	$id = $_POST['chgisid'];
/* 	$apiBegin = "http://cbdb.fas.harvard.edu/cbdbapi/person.php?id=";
	$apiEnd = "&o=json";
	$url = $apiBegin.trim(urlencode($id)).$apiEnd;*/
	//$chgis = "http://maps.cga.harvard.edu/tgaz/placename/json/";
	//$chgis = "http://chgis.fas.harvard.edu/tgaz/placename/esgar/";
	$chgis = "http://maps.cga.harvard.edu/tgaz/placename/json/";
	//$chgis = "http://140.247.114.125/placename/esgar/";
	//$chgis = "http://en.wikipedia.org/w/api.php?action=opensearch&search=";
	$url = $chgis.$id;
	//$url = $chgis.trim(urlencode($id));
	$sql = "SELECT count(*) FROM anno WHERE sys_id='".$id."'";
	$result = runQuery($sql);
	//echo implode(";", $result);
	$data = $result->fetch_assoc();
	$data = implode(";",$data);
	if(intval($data)>0){
		$sql = "SELECT new_json FROM anno WHERE sys_id='".$id."' ORDER BY annoid DESC LIMIT 1";
		$result = runQuery($sql);
		$data = $result->fetch_assoc();
		$data = implode(";",$data);
		//$data = base64_decode($data);
		$data = json_encode($data);
		echo $data;
	}else{
		$data = file_get_contents($url);
		echo json_encode($data);
	}
	
?>