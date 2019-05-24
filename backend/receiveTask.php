<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new ReceiveTask)->init();

class ReceiveTask
{
    public function init()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($data, true));
        if (array_key_exists('status', $data)) {
            error_log('data is single task');
            $this->router($data);
        } else {
            foreach ($data as $task) {
                error_log('data is array of tasks');
                $this->router($task);
            }
        }
    }

    public function router($task)
    {
        error_log(print_r($task, true));
        switch ($task['status']) {
            case 'new':
            $this->addTask($task);
            break;
            case 'update':
            $this->updateTask($task);
            break;
            case 'delete':;
            $this->deleteTask($task);
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

    public function updateTask($data)
    {
        echo '{"server":"updated task"}';
    }

    public function deleteTask($data)
    {
        echo '{"server":"deleted task"}';
    }
}
