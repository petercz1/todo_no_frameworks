<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new SetTask)->init();

class SetTask
{
    public function init()
    {
        $body = file_get_contents('php://input');
        error_log(print_r($body, true));
        $this->setTask($body);
    }

    public function setTask($data)
    {
        // sort it!
        $tasks = json_decode(\file_get_contents('tasks.json'));
        array_unshift($tasks, $data);
        \error_log(print_r($tasks, true));
        file_put_contents('tasks.json', json_encode($tasks));
        echo json_encode($tasks);
    }
}
