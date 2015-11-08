<?php

require "db_conf.php";

// ENTRY POINT
if (isset($_POST["type"]))
{
	$type = mysqli_real_escape_string($connect,$_POST["type"]);
	checkMethod($type);
}

function checkMethod($type)
{
	global $connect;

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

		case "getUserId":
			if (isset($_POST["getUserId"]))
			{
				$payload = $_POST["getUserId"];
				$blah = $userManager->getUserId($payload);
			}
			break;

		case "setUsersWages":
			if (isset($_POST["wage"]) && isset($_POST["date"]))
			{
				$wageForThisMonth = mysqli_real_escape_string($connect,$_POST["wage"]);
				$date = mysqli_real_escape_string($connect,$_POST["date"]);
				$userManager->setUsersWages($wageForThisMonth, $date);
			}
			break;

		case "getUsersEvents":
			$userManager->getUsersEvents();
			break;

		case "setUsersEvents":
			if (isset($_POST["name"]) && isset($_POST["detail"]) && isset($_POST["date"]))
			{
				$name = mysqli_real_escape_string($connect,$_POST["name"]);
				$detail = mysqli_real_escape_string($connect,$_POST["detail"]);
				$date = mysqli_real_escape_string($connect,$_POST["date"]);
				$userManager->setUsersEvents($name, $detail, $date);
			}
			break;

		case "setUsersSpend":
			if (isset($_POST["name"]) && isset($_POST["detail"]) && isset($_POST["date"]))
			{
				$name = mysqli_real_escape_string($connect,$_POST["name"]);
				$detail = mysqli_real_escape_string($connect,$_POST["detail"]);
				$date = mysqli_real_escape_string($connect,$_POST["date"]);
				$userManager->setUsersSpend($name, $detail, $date);
			}
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
				$usr = mysqli_real_escape_string($connect,$val);
				break;

				case "pwd":
				$pwd = mysqli_real_escape_string($connect,$val);
				break;

				case "nm":
				$nm = mysqli_real_escape_string($connect,$val);
				break;

				case "email":
				$email = mysqli_real_escape_string($connect,$val);
				break;
			}
		}

		$hashed = $this->hashPassword($pwd);

		// insert into db
		mysqli_query($connect, "INSERT INTO users (u_username, u_password, u_name, u_email) VALUES ('$usr', '$hashed', '$nm', '$email')");

		$this->logUserIn($usr);
	}

	private function hashPassword($plaintext_password)
	{
		return password_hash($plaintext_password,PASSWORD_DEFAULT);
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

		$doesUserExist = $this->checkUsernameExists($usr);

		if ($doesUserExist)
		{
			// because they exist, need to 
			// check if password matches existing hash
			$isPasswordCorrect = $this->checkPassword($usr, $pwd);

			if ($isPasswordCorrect == true)
			{
				$this->logUserIn($usr);
			}
			else if ($isPasswordCorrect == false)
			{
				echo htmlspecialchars("incorrectpw");
			}

		}
		else if (!$doesUserExist)
		{
			// they need to register instead
			echo htmlspecialchars("nonexistent");
		}
	}

	private function checkUsernameExists($usr)
	{
		global $connect;

		$check = mysqli_query($connect,"SELECT u_username FROM users WHERE u_username = '$usr'");

		if ($check->num_rows >= 1)
		{
			return true;
		}
		else if ($check->num_rows == 0)
		{
			return false;
		}
	}

	function checkPassword($usr, $pwd)
	{
		global $connect;

		$plaintext_password = $pwd;

		$checkPW = mysqli_query($connect,"SELECT u_password FROM users WHERE u_username = '$usr'");

		$var = mysqli_fetch_row($checkPW);

		foreach ($var as $row)

		if (!password_verify($plaintext_password,$row))
		{
			return false;
		}

		if (password_verify($plaintext_password,$row))
		{
			return true;
		}

	}

	private function getUserId()
	{
		global $connect;

		session_start();

		$usr = $_SESSION['username'];

		$userId = mysqli_query($connect, "SELECT u_id FROM users WHERE u_username = '$usr'");

		$match = mysqli_fetch_row($userId);

		return $match;
	}

	public function getUsersWages()
	{
		global $connect;

		$match = $this->getUserId();

		foreach ($match as $vals)

		$sqlResult = mysqli_query($connect, "SELECT w_date, w_amount FROM wages WHERE w_user = '$vals'");

		$json = array();

		while ($row = mysqli_fetch_array($sqlResult, MYSQLI_ASSOC)) 
		{
			$json[] =  $row;
		}

		mysqli_close($connect);

		echo json_encode($json);
	}

	public function setUsersWages($wage, $date)
	{
		global $connect;

		$match = $this->getUserId();

		foreach ($match as $uid);

		$sql = mysqli_query($connect,"INSERT INTO wages (w_date,w_amount,w_user) VALUES ('$date','$wage','$uid')");
	
		mysqli_close($connect);

		echo "done";
	}

	public function setUsersSpend($name, $detail, $date)
	{
		global $connect;

		$match = $this->getUserId();

		foreach ($match as $uid);

		$sql = mysqli_query($connect,"INSERT INTO cal_spends (s_name, s_price, s_date, s_user) VALUES ('$name', '$detail', '$date', '$uid')");

		mysqli_close($connect);
	}

	public function getUsersEvents()
	{
		global $connect;

		$match = $this->getUserId();

		foreach ($match as $uid);
		
		$events = mysqli_query($connect, "SELECT e_name, e_desc, e_date FROM cal_events WHERE e_user = '$uid'");
		$spends = mysqli_query($connect, "SELECT s_name, s_price, s_date FROM cal_spends WHERE s_user = '$uid'");

		$json = array();

		while ($row = mysqli_fetch_array($spends, MYSQLI_ASSOC)) 
		{
			$json[] =  $row;
		}

		while ($row = mysqli_fetch_array($events, MYSQLI_ASSOC)) 
		{
			$json[] =  $row;
		}

		mysqli_close($connect);

		echo json_encode($json, JSON_NUMERIC_CHECK);
	}

	public function setUsersEvents($name, $detail, $date)
	{

		echo $date;
		global $connect;

		$match = $this->getUserId();

		foreach ($match as $uid);

		$sql = mysqli_query($connect,"INSERT INTO cal_events (e_name, e_desc, e_date, e_user) VALUES ('$name', '$detail', '$date', '$uid')");
	
		echo "done";

		mysqli_close($connect);
	}


	private function logUserIn($username)
	{
		session_start();
		$_SESSION['username'] = $username;
		echo htmlspecialchars("success");
	}

}

?>