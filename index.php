<?php 
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
	<title>Welcome home</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="initial-scale = 1.0, user-scalable = no">

	<link rel="stylesheet" type="text/css" href="css/form.css" />
		<link rel="stylesheet" type="text/css" href="css/semantic.css" />
	<link rel="stylesheet" type="text/css" href="css/dropdown.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>

<body>

<div class="user-toolbar">

	<!-- stats n shit -->
	<div class="stats-toolbar">

		<div class="stats-item">
			<div class="value" id="taskCount">?</div>
			<div class="label">Tasks</div>
		</div>

		<div class="stats-item">
			<div class="value" id="moneyCount">?</div>
			<div class="label">Money</div>
		</div>

		<!--
		<div class="stats-item">
			<div class="value" id="emailCount">?</div>
			<div class="label">Emails</div>
		</div>
		-->

	</div>

	<!-- user management -->
	<div class="user-info">

		<div class="user-name">
			<?php echo $_SESSION['username']; ?>
			<img src="./img/user.png">
		</div>

		<div class="user-menu-item">Sign out</div>
		<div class="user-menu-item">Manage details</div>

	</div>

</div>
</div>

	<!-- PANEL ONE -->
	<div class="main-content">

	<div class="row">

		<div class="column-3">
			&nbsp;

			<ul class="navigation-menu">
				<li class="navigation-item"><a href="#calendar" class="nav-link">Calendar</a></li>
				<li class="navigation-item"><a href="#todo-container" class="nav-link">Todo</a></li>
				<li class="navigation-item"><a href="#gmail" class="nav-link">Emails</a></li>
				<li class="navigation-item"><a href="#news" class="nav-link">Feeds</a></li>

			</ul>
		</div>

		<div class="column-9  content-area"  id="calendar">
			<div class="modal-calendar"></div>
		</div>

	</div>

	<div class="row content-area" id="todo-container">

		<div class="column-3">
			&nbsp;
		</div>

		<div class="column-9">
			<div id="todo"></div>
		</div>

	</div>

	<!--
	<div class="row" id="bash">

		<div class="column-3">
			&nbsp;
		</div>

		<div class="column-9">
			<div class="quote feed" id="bash"><h3>Random Bash Quote</h3></div>
		</div>

	</div>
	-->

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

	</div>


<!-- DEPENDENCIES -->
<script type="text/javascript" src="js/libraries/jquery.js"></script>
<script type="text/javascript" src="js/libraries/jquery-ui.js"></script>
<script type="text/javascript" src="js/libraries/shapeshift.js"></script>
<script type="text/javascript" src="js/libraries/waypoints.js"></script>
<script type="text/javascript" src="js/libraries/semantic.js"></script>
<script type="text/javascript" src="js/libraries/underscore.js"></script>
<script type="text/javascript" src="js/libraries/moment.js"></script>
<script type="text/javascript" src="js/libraries/form.js"></script>
<script type="text/javascript" src="js/libraries/google.js"></script>
<script type="text/javascript" src="js/libraries/encoding.js"></script>
<script type="text/javascript" src="js/modules/core.js"></script>
<script type="text/javascript" src="js/modules/interaction.js"></script>
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