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

		case "setUsersWages":
			if (isset($_POST["wage"]) && isset($_POST["date"]))
			{
				$wageForThisMonth = $_POST["wage"];
				$date = $_POST["date"];
				$userManager->setUsersWages($wageForThisMonth, $date);
			}
			break;

		case "getUsersEvents":
			$userManager->getUsersEvents();
			break;

		case "setUsersEvents":
			if (isset($_POST["name"]) && isset($_POST["detail"]) && isset($_POST["date"]))
			{
				$name = $_POST["name"];
				$detail = $_POST["detail"];
				$date = $_POST["date"];
				$userManager->setUsersEvents($name, $detail, $date);
			}
			break;

		case "setUsersSpend":
			if (isset($_POST["name"]) && isset($_POST["detail"]) && isset($_POST["date"]))
			{
				$name = $_POST["name"];
				$detail = $_POST["detail"];
				$date = $_POST["date"];
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