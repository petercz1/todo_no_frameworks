<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new ReceiveTask)->init();

// receives new task, changed task and deleted task.
// I would probably split these functions up!
class ReceiveTask
{
    public function init()
    {
        // get task from frontend
        $data = json_decode(file_get_contents('php://input'), true);
        if (array_key_exists('taskname', $data)) {
            $this->simpleRouter($data);
        } else {
            foreach ($data as $task) {
                $this->simpleRouter($task);
            }
        }
    }

    public function simpleRouter($task)
    {
        error_log(print_r($task, true));
        if ($task['deleteTask']) {
            return $this->deleteTask($task);
        }
        else if ($task['changeTask']) {
            return $this->changeTask($task);
        }
        else {
            return $this->addTask($task);
        }
    }

    public function addTask($task)
    {
        error_log('adding task');
        $tasks = json_decode(\file_get_contents('tasks.json'), true);
        array_unshift($tasks, $task);
        file_put_contents('tasks.json', json_encode($tasks));
        echo '{"server":"added task"}';
    }

    public function changeTask($task)
    {
        error_log('changing task');
        $tasks = json_decode(\file_get_contents('tasks.json'), true);
        error_log(print_r($tasks, true));
        foreach ($tasks as &$item) {
            $item = (array)$item;
            if ($item['id'] == $task['id']) {
                $item['changeTask'] = false;
                $item['checked'] = $task['checked'];
            }
        }
        error_log(print_r($tasks, true));
        file_put_contents('tasks.json', json_encode($tasks));
        error_log('task changed');
        echo '{"server":"changed task"}';
    }

    public function deleteTask($task)
    {
        error_log('deleting task');
        $tasks = json_decode(\file_get_contents('tasks.json'), true);
        $index = array_search($task['id'], array_column($tasks, 'id'));
        foreach ($tasks as $key => $item) {
            if ($item['id'] == $task['id']) {
                unset($tasks[$key]);
            }
        }
        file_put_contents('tasks.json', json_encode($tasks));
        echo '{"server":"deleted task"}';
    }
}
