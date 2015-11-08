<?php 
	// clever bit of redirect code
	// php executes before rest of html
	session_start();

	if (!isset($_SESSION['username']))
	{
	    header("Location: login.php");
	    die();
	}
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>Welcome home, <?php echo $_SESSION['username']; ?>!</title>
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
				<div class="user-name column-6 float">
					<?php echo $_SESSION['username']; ?>
				</div>
			</div>

			<div class="row">
				<div class="user-menu-item column-6 float">
					Sign out
				</div>
				<div class="user-menu-item column-6 float">
					View profile
				</div>
			</div>

			<div id="user-name-hidden"><?php echo $_SESSION['username']; ?></div>
		</div> <!-- end user manager -->

		<div class="statistics-info row">

			<div class="stat-item column-6">
				<div class="value">4</div>
				<div class="label">Tasks</div>
			</div>
			<div class="stat-item column-6">
				<div class="value">12</div>
				<div class="label">Money</div>
			</div>

			<div class="stat-item column-6">
				<div class="value">3</div>
				<div class="label">Emails</div>
			</div>
			<div class="stat-item column-6">
				<div class="value">5</div>
				<div class="label">News</div>
			</div>
		</div>

		
		<!-- navigation populated with clickable links. this is fixed in the viewport and always appears-->
		<div class="navigation row">
			<div class="navigation-item active-nav">Calendar</div>
			<div class="navigation-item">Todo</div>
			<div class="navigation-item">Emails</div>
			<div class="navigation-item">Feeds</div>
		</div><!-- end nav -->

	</div> <!-- end user  toolbar -->


	<div class="main-content"> <!-- panels (useful user modules) are automatically injected here -->

		<!-- each row has a left and right column -->
		<!-- this row also has 'full-page-panel' is set 100vh in the css and the scroll plugin is attached to -->
		<div class="row full-page-panel">

			<!-- asymmetrical design, keep left hand column blank -->
			<div class="column-3 responsive-none">&nbsp;</div>

			<div class="column-9  content-area  responsive-full"  id="calendar">
				<div class="modal-calendar"></div>
			</div>

		</div> <!-- end row -->

		<div class="row full-page-panel" id="todo-container">

			<div class="column-3">&nbsp;</div>

			<div class="column-9">
				<div id="todo"></div>
			</div>

		</div> <!-- end row -->

	</div> <!-- end main content -->


	<!--
	<div class="row" id="bash">

		<div class="column-3">
			&nbsp;
		</div>

		<div class="column-9">
			<div class="quote feed" id="bash"><h3>Random Bash Quote</h3></div>
		</div>

	</div>


	<div class="row content-area" id="gmail">

		<div class="column-3">
			&nbsp;
		</div>

		<div class="column-9">
			<div id="gmailContent" class="ui stacked segment">
				<h2>Your emails <span class="integer_count"></span></h2>
				<div id="login_container" class="pre_auth">Please <a href="#" id="login_link">authorise</a> Gmail to use this app.</div>
			</div>
		</div>

	</div>

	<div class="row content-area" id="news">

		<div class="column-3">
			&nbsp;
		</div>

		<div class="column-9">
 			<div class="resizable-grid">
      			<div class="news-item"><header>BBC News</header><div id="bbc" class="ui selection list feed"></div></div>
      			<div class="news-item"><header>Gamespot</header><div id="gamespot" class="ui selection list feed"></div></div>
      			<div class="news-item"><header>Clients from Hell</header><div id="clients" class="ui selection list feed"></div></div>
      			<div class="news-item"><header>Reddit</header><div id="reddit" class="ui selection list feed"></div></div>
      			<div class="news-item"><header>Preshing on Programming</header><div id="preshing" class="ui selection list feed"></div></div>
      			<div class="news-item"><header>Coding Horror</header><div id="coding" class="ui selection list feed"></div></div>
  			</div>
		</div>
	-->


<!-- DEPENDENCIES -->
<script type="text/javascript" src="js/libraries/jquery.js"></script>
<script type="text/javascript" src="js/libraries/jquery-ui.js"></script>
<script type="text/javascript" src="js/libraries/scroll.js"></script>

<script type="text/javascript" src="js/libraries/shapeshift.js"></script>
<script type="text/javascript" src="js/libraries/semantic.js"></script>
<script type="text/javascript" src="js/libraries/underscore.js"></script>
<script type="text/javascript" src="js/libraries/moment.js"></script>
<script type="text/javascript" src="js/libraries/form.js"></script>
<script type="text/javascript" src="js/libraries/google.js"></script>
<script type="text/javascript" src="js/libraries/encoding.js"></script>
<script type="text/javascript" src="js/modules/core.js"></script>
<script type="text/javascript" src="js/modules/gmail.js"></script>
<script type="text/javascript" src="js/modules/feeds.js"></script>
<script type="text/javascript" src="js/modules/todo.js"></script>
<script type="text/javascript" src="js/modules/calendar-module.js"></script>
<script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
<script type="text/javascript">
	Calendar.initialise();
</script>

</body>
</html>