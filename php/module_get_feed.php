<?php
// this will read xml and send it back to javascript
// it takes an argument of a url of a valid site that serves xml
// copyright 2014 intheon

require "main_conf.php";

$entries = array();
$count = 0;



if (isset($_POST['website']))
{

	$url_param = $_POST['website'];
	$website = $_POST['tagline'];
	$limit = $_POST['quant'];

	if($website == "bash")
	{
		$dom = new DOMDocument();
		$raw = file_get_contents("http://bash.org/?random");

		$dom->loadHTML($raw);

		echo print_r($dom);
		//echo $raw;
	}
	else
	{
		$offset = 0;
		// once we have the url parameters, process to parse the biatch.

		$xml = simplexml_load_file($url_param);
		// simplexml_load_file is useful as it will just get the thing we want

		foreach($xml as $key)
		{
			$entries = array_merge($entries, $xml->xpath("//item"));
		}

		// i get back an object
		// the above loops through, and merges each entry onto an empty array
		// the magic is in the xpath, it digs into the xml and grabs only those elements and children
	}

}

$chopped = array_slice($entries,$offset,$limit);

echo json_encode($chopped);

?>