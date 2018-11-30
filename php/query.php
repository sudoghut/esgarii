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


function getContent($toQuery){
	$query = "select id, text from content where page=".$toQuery." ORDER BY sort";
	$result = runQuery($query);
	$num_results = $result->num_rows;
	if (is_int($num_results) and $num_results!=0) {
		for($i=0; $i<$num_results; $i++)
			{
				$row = $result->fetch_assoc();
				$contentAndId[] = array('id'=>$row['id'], 'text'=>$row['text']);
			}
		return $contentAndId;
	}
}

?>