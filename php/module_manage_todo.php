<?php

// will take json and write it to a file
require "main_conf.php";


if (isset($_POST['json']))
{
	$json = json_encode($_POST['json']);

	$file = fopen( $rootDir . "todo_numbers.json","w+");

		fwrite($file, $json);
		fclose($file);
}

echo "success";



?>