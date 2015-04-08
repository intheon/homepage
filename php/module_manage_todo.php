<?php

// will take json and write it to a file
require "main_conf.php";


// retrieving the file
if (isset($_GET['get']))
{
	if ($_GET['get'] == true)
	{
		echo file_get_contents("../todo_numbers.json");
	}
}


// writing the file
if (isset($_POST['json']))
{
	//our json to write
	if (!file_exists("../todo_numbers.json"))
	{
		// write a blank file
		$json = '{"items":['.json_encode($_POST['json']).']}';
	}
	else
	{
		// append to existing file
		$current = file_get_contents("../todo_numbers.json");
		$current = substr($current,0,strlen($current)-2);
		$new = json_encode($_POST['json']);
		$json = $current . ',' . $new . ']}';
	}

		$file = fopen("../todo_numbers.json","w+");

		fwrite($file, $json);
		fclose($file);
}



?>