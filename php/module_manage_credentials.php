<?php

require "db_conf.php";

// ENTRY POINT
if (isset($_POST["type"]))
{
	$type = $_POST["type"];
	checkMethod($type);
}

function checkMethod($type)
{
	$userManager = new userManager;

	switch ($type)
	{
		case "registerNewUser":
		if (isset($_POST["payload"]))
		{
			$payload = $_POST["payload"];
			$userManager->registerNewUser($payload);
		}
		break;

		default:
		echo "shit broke y0";
		break;
	}
}

class userManager
{
	// VALIDATE THE SHIT OUT OF THIS
	// CBA AT PRESENT
	public function registerNewUser($payload)
	{
		global $connect;

		$arr = json_decode($payload);

		foreach ($arr as $key => $val)
		{
			switch ($key)
			{
				case "usr":
				$usr = $val;
				break;

				case "pwd":
				$pwd = $val;
				break;

				case "nm":
				$nm = $val;
				break;

				case "email":
				$email = $val;
				break;
			}
		}

		// insert into db
		mysqli_query($connect, "INSERT INTO users (u_username, u_password, u_name, u_email) VALUES ('$usr', '$pwd', '$nm', '$email')");

		$this->logUserIn($usr);
		// get u_id of matching username

		/* this will be useful in a mo
		$userId = mysqli_query($connect, "SELECT u_id FROM users WHERE u_username = '$usr'");

		$match = mysqli_fetch_row($userId);

		print_r($match);
		*/
	}

	private function logUserIn($username)
	{
		session_start();
		$_SESSION['username'] = $username;
		echo htmlspecialchars("success");
	}

}

?>