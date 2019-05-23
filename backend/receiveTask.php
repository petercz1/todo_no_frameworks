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
        $body = json_decode(file_get_contents('php://input'), true);
        \error_log(print_r($body, true));
        switch ($body['status']) {
            case 'new':
            $this->addTask($body);
            break;
            case 'update':
            $this->updateTask($body);
            break;
            case 'delete':;
            $thi->delete($body);
            break;
        }
    }

    public function addTask($data)
    {
        $tasks = json_decode(\file_get_contents('tasks.json'));
        array_unshift($tasks, $data);
        file_put_contents('tasks.json', json_encode($tasks));
        echo '{"server":"added task"}';
    }
}
