<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new GetTasks)->init();

class GetTasks
{
    public function init()
    {
        $this->getTask();
    }

    public function getTask($data)
    {
        echo \file_get_contents('tasks.json');
    }
}
