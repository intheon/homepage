<?php

// the php file is executing this
if (isset($_POST['filename']))
{

	$file 					= $_POST['filename'];

	if (isset($_POST['method']) && isset($_POST['flag']))
	{
		$method 			= $_POST['method'];
		$flag 				= $_POST['flag'];

		if (isset($_POST['data']))
		{
			$data 			= $_POST['data'];
			checkMethod($file,$method,$data,$flag);
		}
	}
}


class filemanager 
{
	public function addToFile($filename,$data,$flag)
	{
		if (!file_exists("../" . $filename))
		{
			// write a blank file and write initial block
			$json = '{"items":['.json_encode($data).']}';
			writeFile($filename,$json);
		}
		else
		{
			if ($flag == "todo")
			{
				// append to existing file
				$current = file_get_contents("../" . $filename);
				$current = substr($current,0,strlen($current)-2);
				$new = json_encode($data);
				$json = $current . ',' . $new . ']}';
				writeFile($filename,$json);
			}
			else if ($flag == "complex")
			{
				$json = json_encode($data);
				writeFile($filename,$json);
			}
		}
	}

	public function readFile($filename)
	{
		$response = (file_exists("../" . $filename) ? file_get_contents("../" . $filename) : "file doesnt exist");
		echo $response;
	}
	public function deleteRecord($filename,$data)
	{
		$json = '{"items":'.json_encode($data).'}';
		writeFile($filename,$json);
	}

	public function deleteFile($filename)
	{
		unlink("../" . $filename);
	}

}

function checkMethod($file,$method,$data,$flag)
{
	$filemanager 		= new filemanager;

	switch ($method) 
	{
		case "addToFile":
			$filemanager->addToFile($file,$data,$flag);
			break;

		case "readFile":
			$filemanager->readFile($file);
			break;

		case "deleteFile":				
			$filemanager->deleteFile($file);
			break;

		case "deleteRecord":				
			$filemanager->deleteRecord($file,$data);
			break;

		default:
			echo "shit broke y0";
			break;
	}
}

function writeFile($filename,$json)
{
	$file = fopen("../" . $filename,"w+");
	fwrite($file, $json);
	fclose($file);
}

?>