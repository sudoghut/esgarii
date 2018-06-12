<?php
include_once 'loginQuery.php';
/* if(!isset($GLOBALS['getPassToken'])){
	include_once '../editting.php';	
} */

$GLOBALS['getPassToken'] = 'no';
$loginStatus = 1;
@$user = $_POST['id'];
@$pw = $_POST['pw'];
$checkCookie = checkCookie();
$loginStatus = "";
if (isset($user)&&isset($pw)) {
  $loginStatus =login($user, $pw);
  if($loginStatus=="0"){
		//echo $loginStatus;
	  $GLOBALS['getPassToken'] = 'yes';
  }else{
	  $GLOBALS['getPassToken'] = 'no';
  }
}elseif(isset($checkCookie)){
	  if($checkCookie==0){
		$GLOBALS['getPassToken'] = 'yes';
	  }else{
		  $GLOBALS['getPassToken'] = 'no';
	  }
}else{
	  $GLOBALS['getPassToken'] = 'no';
}

echo $GLOBALS['getPassToken'];
//echo $checkCookie;
?>