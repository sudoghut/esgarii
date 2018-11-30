<?php
		ob_start();
		$GLOBALS['getPassToken'] = 'no';
		include_once 'php/callLoginQuery.php';
		$checkCookie = checkCookie();
		if($GLOBALS['getPassToken']=="yes"){
			//header('Location: http://oopus.info/esgarii/editting.php') ;
      header('Location: http://127.0.0.1/git/esgarii/editting.php');
		}
		
		ob_end_clean();
		ob_start();
?>
<html>
<head>
<title>ESGAR</title>
<script type="text/javascript" src="js/jquery-1.11.3.js"></script>
    <!-- Bootstrap core CSS -->
<link href="css/bootstrap.css" rel="stylesheet">
<style type="text/css">
body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
</head>

  <body>

    <div class="container">

      <div class="form-signin">
        <h2 class="form-signin-heading">ESGAR LOGIN</h2>
        <label for="id" class="sr-only">Username</label>
        <input id="id" class="form-control" placeholder="Username" required autofocus>
        <label for="pw" class="sr-only">Password</label>
        <input type="password" id="pw" class="form-control" placeholder="Password" required>
        <div class="checkbox">
        </div>
        <button id="signin" class="btn btn-lg btn-primary btn-block" type="submit" onclick="submit()">Sign in</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" onclick="logout()">Logout</button>
      </div>

    </div> <!-- /container -->
<script type="text/javascript">
var submit = function(){
  user = $("#id").val();
  pw =$("#pw").val();
  $.ajax({
    url:"php/callLoginQuery.php",
    type:"POST",
    data:{id:user,pw:pw},
    success:function(msg){
		console.log(msg);
		if(msg=="yes"){
			console.log("here")
			window.location.replace("http://127.0.0.1/git/esgarii/editting.php");
		}else{
			alert("Your information is not correct")
		}
	
    },
    error:function(request, status, error){
			alert("Your information is not correct")
      console.log(request.responseText);
    }   
  })
}
var logout = function(){
  $.ajax({
    url:"php/callLogoutQuery.php",
    type:"POST",
    success:function(msg){
		console.log(msg);
		if(msg==0){
			alert("logout successful");
			location.reload();
		}
    },
    error:function(request, status, error){
      console.log(request.responseText);
			location.reload();
    }   
  })
}

$(document).ready(function(){
    $('#pw').keypress(function(e){
      if(e.keyCode==13)
      $('#signin').click();
    });
});
</script>


  </body>
</html>
<?php
    ob_end_flush(); // Flush the output from the buffer
?>