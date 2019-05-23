<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new AddTask)->init();

class AddTask
{
    public function init()
    {
        $body = json_decode(file_get_contents('php://input'));
        error_log(print_r($body, true));
        $this->addTask($body);
    }

    public function addTask($data)
    {
        // sort it!
        $tasks = json_decode(\file_get_contents('tasks.json'));
        array_unshift($tasks, $data);
        \error_log(print_r($tasks, true));
        file_put_contents('tasks.json', json_encode($tasks));
        $taskname = data['taskname'];
        error_log($taskname);
        echo "{'server':'added $taskname'}";
        //echo json_encode($tasks);
    }
}
