<?php
	if (!isset($_COOKIE["authToken"]))
	{
		header("Location: login.php");
		die();
	}
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="initial-scale = 1.0, user-scalable = no">

	<!-- sheets -->
	<link rel="stylesheet" type="text/css" href="css/form.css" />
	<link rel="stylesheet" type="text/css" href="css/semantic.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>

<body>

	<div class="user-toolbar"> <!-- has useful stuff for the user -->

		<!-- user management -->
		<div class="user-tools row">

			<div class="row">
				<div class="user-img column-6 float">
					<img src="./img/user.png">
				</div>
				<div class="user-name column-6 float" id="userName">
				</div>
			</div>

			<div class="row">
				<div class="user-menu-item column-6 float">
				 	Profile
				</div>
				<div class="user-menu-item column-6 float">
					Sign out
				</div>
			</div>
		</div> <!-- end user manager -->

		<div class="statistics-info row"> <!-- Summary of widgets injected here -->

		</div><!-- end summary -->

		
		<div class="navigation row" id="navigation-here"><!-- Navigation links injected here-->
		</div><!-- end nav -->

	</div> <!-- end user toolbar -->

	<div class="main-content" id="content-here"> <!-- Widgets injected here -->
	
	</div> <!-- end main content -->

<!-- DEPENDENCIES -->
<script type="text/javascript" src="js/libraries/jquery.js"></script>
<script type="text/javascript" src="js/libraries/jquery.cookie.js"></script>
<script type="text/javascript" src="js/libraries/scroll.js"></script>
<script type="text/javascript" src="js/libraries/semantic.js"></script>
<script type="text/javascript" src="js/libraries/form.js"></script>
<script type="text/javascript" src="js/libraries/underscore.js"></script>
<script type="text/javascript" src="js/libraries/moment.js"></script>
<script type="text/javascript" src="js/libraries/linkify.min.js"></script>
<script type="text/javascript" src="js/libraries/linkify-jquery.js"></script>

<!-- The Engine! -->
<script type="text/javascript" src="js/modules/core.js"></script>

</body>
</html>

