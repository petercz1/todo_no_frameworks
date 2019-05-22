<?php
declare(strict_types=1);
namespace chipbug\todo;

class SetTask{

	public function __construct(){
		$data = $_POST;
		echo json_encode($data);
	}
}