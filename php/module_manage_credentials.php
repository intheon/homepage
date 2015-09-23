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

		case "getUsersWages":
			$userManager->getUsersWages();
			break;

		case "signInUser":
			if (isset($_POST["payload"]))
			{
				$payload = $_POST["payload"];
				$userManager->signInUser($payload);
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

	public function signInUser($payload)
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
			}
		}
		$this->logUserIn($usr);
	}

	public function getUsersWages()
	{
		global $connect;

		session_start();

		$usr = $_SESSION['username'];

		$userId = mysqli_query($connect, "SELECT u_id FROM users WHERE u_username = '$usr'");

		$match = mysqli_fetch_row($userId);

		foreach ($match as $vals)

		$wages = mysqli_query($connect, "SELECT w_amount FROM wages WHERE w_user = '$vals'");

		foreach ($wages as $something => $else)
		{
			foreach ($else as $blah)
			{
				echo $blah;
			}
		}

		/*
		foreach ($wages as $rows => $val)
		{
			$wAmount = mysqli_fetch_row($wages);
			echo $wAmount;
		}



		$wAmount = mysqli_fetch_row($wages);

		print_r($wAmount);

		foreach ($wAmount as $amount)
		{
			echo $amount;
		}
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