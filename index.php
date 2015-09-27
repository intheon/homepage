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

	<link rel="stylesheet" type="text/css" href="css/semantic.css" />
	<link rel="stylesheet" type="text/css" href="css/form.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>

<body class="smoothWheel">

<div class="user-toolbar">
	<div class="user-info">
		<?php echo $_SESSION['username']; ?>
		<i class="user icon"></i>
	</div>
</div>

	<!-- PANEL ONE -->
	<div class="area" id="home">
		<div class="ui raised segment" id="welcome">

			<div class="flex-item one-half"><div class="padding">
            	<div class="jcarousel-wrapper">
                	<div class="jcarousel">
                    	<ul class="pp">
                        	<li>
                        		<h5 class="ui horizontal header divider"><i class="child icon"></i>Welcome Home</h5>
                        		<div class="greeting">Had a hard day buddy? Why not chill with some lols and a beer!</div>
                        	</li>
                        	<li>
                        	    <h5 class="ui horizontal header divider"><i class="gamepad icon"></i>Interwebs</h5>
                        		<a href="http://www.shodanhq.com/"><div class="ui animated fade button "><div class="visible content">Shodan!</div><div class="hidden content">Discover!</div></div></a>
                        		<a href="http://draugr.stumbleupon.com"><div class="ui animated fade button stumble"><div class="visible content">Stumble!</div><div class="hidden content">Interwebs!</div></div></a>
                        	</li>
                        	<li>
                        	    <h5 class="ui horizontal header divider"><i class="play icon"></i>Entertainment</h5>
                        		<a href="http://netflix.com"><div class="ui animated fade button netflix"><div class="visible content">Netflix!</div><div class="hidden content">Watch!</div></div></a>
                        		<a href="http://last.fm"><div class="ui animated fade button lastfm"><div class="visible content">Last.fm!</div><div class="hidden content">Listen!</div></div></a>
                        	</li>
                        	<li>
                        		<h5 class="ui horizontal header divider"><i class="steam square icon"></i>Gaming</h5>
                        		<a href="http://store.steampowered.com/"><div class="ui animated fade button steamButton"><div class="visible content">Steam!</div><div class="hidden content">Play!</div></div></a>
                        	</li>
                        	<li>
                        		<h5 class="ui horizontal header divider"><i class="steam square icon"></i>Development</h5>
                        		<a href="http://store.steampowered.com/"><div class="ui animated fade button "><div class="visible content">StackOverflow!</div><div class="hidden content">Learn!</div></div></a>
                        	</li>
                    	</ul>
                	</div>
					<a href="#" class="jcarousel-control-prev">&lsaquo;</a>
                	<a href="#" class="jcarousel-control-next">&rsaquo;</a>
					<p class="jcarousel-pagination"></p>
            	</div>
            </div></div>
			<div class="flex-item one-half"><div class="padding">
                <h5 class="ui horizontal header divider"><i class="bar chart icon"></i>Ongoing</h5>
                <div class="ui statistic"><div class="value" id="taskCount">?</div><div class="label">Tasks</div></div>
  				<div class="ui statistic"><div class="value" id="moneyCount">?</div><div class="label">Money</div></div>
				<div class="ui statistic"><div class="value" id="emailCount">?</div><div class="label">Emails</div></div>
  			</div></div>


		</div>

		<div id="tasks" class="ui stacked segment">

			<div id="calendar" class="flex-item one-half"><div class="padding">
			    <h5 class="ui horizontal header divider"><i class="calendar icon"></i>Calendar</h5>
			    <div class="modal-calendar"></div>
			    <!--
			    <div id="messages"></div>
				<div class="calendar" id="cost-calendar"></div>
				<div class="information" id="information-panel"></div>
				-->
			</div></div>

			<div id="todo" class="flex-item one-half"><div class="padding">
			    <h5 class="ui horizontal header divider"><i class="checkmark box icon"></i>Tasks</h5>
			</div></div>

		</div>
		<div id="border" class="ui stacked segment">
			<div class="quote feed" id="bash"><h3>Random Bash Quote</h3></div>
		</div>
	</div>
	<!-- END PANEL -->

	<!-- PANEL TWO -->
	<div class="area" id="gmail"><div id="gmailContent" class="ui stacked segment">
		<h2>Your emails <span class="integer_count"></span></h2>
		<div id="login_container" class="pre_auth">Please <a href="#" id="login_link">authorise</a> Gmail to use this app.</div>
	</div></div>
	<!-- END PANEL -->

	<!-- PANEL THREE -->
	<div class="area" id="news"><div id="border" class="ui stacked segment">

 		<div class="resizable-grid">
      		<div class="news-item"><header>BBC News</header><div id="bbc" class="ui selection list feed"></div></div>
      		<div class="news-item"><header>Gamespot</header><div id="gamespot" class="ui selection list feed"></div></div>
      		<div class="news-item"><header>Clients from Hell</header><div id="clients" class="ui selection list feed"></div></div>
      		<div class="news-item"><header>Reddit</header><div id="reddit" class="ui selection list feed"></div></div>
      		<div class="news-item"><header>Preshing on Programming</header><div id="preshing" class="ui selection list feed"></div></div>
      		<div class="news-item"><header>Coding Horror</header><div id="coding" class="ui selection list feed"></div></div>
  		</div>

	</div></div>
	<!-- END PANEL -->

	<!-- FIXED NAVIGATION -->
	<div class="ui three item orange inverted menu fixed top">
		<a class="active item" id="home_link">Home</a>
		<a class="item" id="gmail_link">Emails</a>
		<a class="item" id="news_link">News Feeds</a>
	</div>
	<!-- END NAVIGATION -->

<!-- DEPENDENCIES -->
<script type="text/javascript" src="js/libraries/jquery.js"></script>
<script type="text/javascript" src="js/libraries/jquery-ui.js"></script>
<script type="text/javascript" src="js/libraries/shapeshift.js"></script>
<script type="text/javascript" src="js/libraries/smoothwheel.js"></script>
<script type="text/javascript" src="js/libraries/jcarousel.js"></script>
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
<script type="text/javascript" src="js/modules/display.js"></script>
<script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
<script type="text/javascript">
	Calendar.initialise();
</script>

</body>
</html>