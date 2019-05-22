<?php
declare(strict_types=1);
namespace chipbug\todo;

class SetTask{

	function __construct(){
		$data = $_POST;
		echo json_encode($data);
	}
}