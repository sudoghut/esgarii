<?php
    ob_start();

		$GLOBALS['getPassToken'] = 'no';
		include_once 'php/callLoginQuery.php';
		$checkCookie = checkCookie();
		// if($GLOBALS['getPassToken']!="yes"){
		// 	header('Location: http://127.0.0.1/git/esgarii/editting.php') ;
		// }
		/* $cookieName = $_COOKIE["cookieName"];
		list($user,$hash) = explode("\t", $cookieName);
		 */

		/* if(isset($checkCookie)){
			if($checkCookie==0){
				$GLOBALS['getPassToken'] = 'yes';
			}else{
				$GLOBALS['getPassToken'] = 'no';
			}
		} */
		ob_end_clean();
		ob_start();

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<script src="js/jquery-1.11.3.js"></script>
<script src="js/controller.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/knockout-3.4.0.js"></script>
<script src="config/structure.js"></script>
<script src="config/data_attr.js"></script>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-theme.css">
  <style type="text/css">
    .L2 {
      margin-left: 5px;
    }
    .L3 {
      margin-left: 10px;
    }
    .L4 {
      margin-left: 15px;
    }
   .L5 {
      margin-left: 20px;
    }
    .L6 {
      margin-left: 25px;
    }
    .L7 {
      margin-left: 30px;
    }
    .L8 {
      margin-left: 35px;
    }
    .json{
      margin-top: 5px;
      font-family: Tahoma;
      font-size: 18px;
    }
	.operationButtonsInMain{
	  margin-left: 5px;
    }

  </style>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top"><!--<font color="white" style="margin-left:1000px">updated June 5, 2016</font>-->
		
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="http://oopus.info/esgarii/">ESGAR</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" onclick="logout()">logout</a></li>
						<li><a >updated June 8, 2016</a></li>
          </ul>
        </div>
      </div>
    </nav>

	<div class="container-fluid">
		<div class="row" style="margin-top:80px">
			<div class="col-sm-6 col-md-5" style="border-right:solid 1px #e8e8e8">
				<div class="form-inline" style="margin-bottom:20px">
				  <div class="form-group">
				    <label for="exampleInputName2">id:</label>
				    <input type="text" class="form-control" id="lookupInput">
				    <button type="button" class="btn btn-default" onclick="callCAPI('lookup')">Load</button>
				  </div>
				  <button type="button" class="btn btn-default">Before</button>
				  <button type="button" class="btn btn-default">After</button>
				</div>
			<div class="jumbotron" id="lookup" style="overflow:scroll; height:800px"></div>
			</div>
			<div class="col-sm-6 col-md-7">
				<div class="form-inline"  style="margin-bottom:20px">
					<div class="form-group">
					<label for="exampleInputName2">id:</label>
					<input type="text" class="form-control" id="mainInput">
					</div>
					<button type="button" class="btn btn-default" onclick="callCAPI('main')">Load</button>
				 	<button type="button" class="btn btn-default" onclick="save_json()">Save</button>
					<button type="button" class="btn btn-default" id="add_element" data-toggle="modal" data-target="#add_blank" onclick="add_new()" disabled=true>Add element</button>
				</div>
			</div>
			<div class="jumbotron" id="main" style="overflow:scroll; height:800px"></div>
		</div>

	</div>
	<!--Modal add new begin-->
	<div class="modal" id="add_blank" role="dialog" aria-labelledby="add_blank_label">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<div class="dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
							Choose a type
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu" id="choose_a_type" aria-labelledby="dropdownMenu1" data-bind="foreach:data">
							<!--<li><a data-bind="text:value"></a></li>-->
							<li><a herf="#" data-bind="text:value, attr:{'onclick':'add_new_type_adddata('+$index()+')'}"></a></li>
						</ul>
				</div>

				</div>
			</div>
		</div>
	</div>
	<!--Modal add new end-->
	
	<script type="text/javascript">

		$('#lookupInput').keypress(function(event) {
		        if (event.keyCode == 13) {
		        	callCAPI("lookup");
		        }
		});
		$('#mainInput').keypress(function(event) {
		        if (event.keyCode == 13) {
		        	callCAPI("main");
		        }
		});
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
	</script>

</body>
</html>
<?php
    ob_end_flush(); // Flush the output from the buffer
?>