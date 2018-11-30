<?php
include_once "query.php";
$GLOBALS['cookieName'] = 'cookieName';

function login($user, $pw){
	@$user = secureWords($user);
	@$pw = secureWords($pw);
	if($user!=""||$pw!=""){
		$hash = encrypt($user, $pw);
		//return checkPassword($user, $hash);
		if (checkPassword($user, $hash)==0) {
			//tcookie($cookieName, $user."\t".$hash, time()+60*60*24*365, '/', 'oopus.info');
			setcookie($GLOBALS['cookieName'], $user."\t".$hash, time()+60*60*24*365, '/', 'oopus.info');
			return "0";
		}
	}else{
		return "1";
	}
}

function logout(){
	if (isset($GLOBALS['cookieName'])) {
		//$cookieFile = $_COOKIE[$GLOBALS['cookieName']];
		//list($user,$hash) = explode("\t", $cookieFile);
		setcookie($GLOBALS['cookieName'], "",time()-7000000, '/', 'oopus.info');
    if(isset($_COOKIE[session_name()])){
        setcookie(session_name(), '',time()-7000000, '/', 'oopus.info');
    }
		return 0;
	}else{
		return 1;
	}
}

function checkCookie(){
	if (isset($_COOKIE[$GLOBALS['cookieName']])) {
		$cookieFile = $_COOKIE[$GLOBALS['cookieName']];
		list($user,$hash) = explode("\t", $cookieFile);
		if (checkPassword($user, $hash)==0&& $user!="") {
			return 0;
		}else{
			return 1;
		}
	}
}


function encrypt($user, $pw){
	//$hash = $user."\t".md5($user.md5($pw));
	$hash = md5($pw);
	return $hash;
}

function checkPassword($user, $hash){
	$usertAndPw = queryPassword($user);
	$correctUser = $usertAndPw[0][0];
	$correctPassword = $usertAndPw[0][1];
	//return $correctPassword;
	if ($user==$correctUser && $hash==$correctPassword) {
		return 0;
	}else{
		return 1;
	}
}

function createNewUser($user,$pw){
	@$user = secureWords($_GET["user"]);
	@$pw = secureWords($_GET["pw"]);
	if($user!=""||$pw!=""){
		$hash = encrypt($user, $pw);
		//...;
	}else{
		return 1;
	}
}

function queryPassword($user){
	$query = "select username, password from users where username=\"".$user."\"";
	$result = runQuery($query);
	$num_results = $result->num_rows;
	if (is_int($num_results) and $num_results!=0) {
		$row = $result->fetch_assoc();
		$usertAndPw[] = array($row['username'], $row['password']);
		return $usertAndPw;
	}
}


function secureWords($word){
	return addslashes(htmlspecialchars($word));
}
?>