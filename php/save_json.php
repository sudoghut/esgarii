<?php
include_once "query.php";

$wholeJson = $_POST['wholeJson'];
if(isset($wholeJson)){
  $sys_id = $wholeJson['sys_id'];
  $wholeJson = json_encode($wholeJson);
  $table = "anno";
  // $new_json_blob = base64_encode($wholeJson);
  // $sql = "INSERT INTO ".$table." (sys_id, new_json_blob) VALUES('". $sys_id."', '".$new_json_blob."')";
  $sql = "INSERT INTO ".$table." (sys_id, new_json) VALUES('". $sys_id."', '".$wholeJson."')";
  runQuery($sql);
  echo ("done");
}else{
	echo "test";
}

?>