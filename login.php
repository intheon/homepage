<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>Login</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="initial-scale = 1.0, user-scalable = no">
	<link rel="stylesheet" type="text/css" href="./css/grid.css" />
	<link rel="stylesheet" type="text/css" href="./css/login-style.css" />
</head>

<body>


<div id="login" class="row">

	<div class="column-12 center">

		<div class="panel">


			<section id="login-forms" class="row forms">

				<header 	class="big-header column-12">Howdy, you're not logged in.</header>
				<input  	class="column-12 center" type="text" placeholder="Username" 		id="login-form-username" /> 
				<input  	class="column-12 center"  type="password" placeholder="Password" 	id="login-form-password" /> 
				<button  	class="column-12" id="submit-sign-in">Sign in >>></button> 
				<button  	class="column-12" id="show-register">Register</button>

			</section>

			<section id="register-forms" class="row forms">

				<header 	class="big-header column-12">Enter your details to register</header>
				<input  	class="column-12 center" type="text" placeholder="Username" 	id="register-form-username" /> 
				<input  	class="column-12 center" type="text" placeholder="Password" 	id="register-form-password" />
				<input  	class="column-12 center" type="text" placeholder="Name" 		id="register-form-name" /> 
				<input  	class="column-12 center" type="text" placeholder="Email" 		id="register-form-email" /> 
				<button  	class="column-12"  id="register-details">Sign in >>></button> 

			</section>


		</div>

	</div>

</div>

<!-- DEPENDENCIES -->
<script type="text/javascript" src="./js/libraries/jquery.js"></script>
<script type="text/javascript" src="./js/libraries/jquery.cookie.js"></script>
<script type="text/javascript" src="./js/modules/login-module.js"></script>

</body>
</html>