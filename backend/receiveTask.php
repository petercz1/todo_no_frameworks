<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new ReceiveTask)->init();

// receives new task, changed task and deleted task.
// I woul dprobably split these
class ReceiveTask
{
    public function init()
    {
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
        if ($task['deleteTask']) {
            return $this->deleteTask($task);
        }
        if ($task['changeTask']) {
            return $this->changeTask($task);
        }
        if ($task['newTask']) {
            return $this->addTask($task);
        }
    }

    public function addTask($task)
    {
        $tasks = json_decode(\file_get_contents('tasks.json'), true);
        array_unshift($tasks, $task);
        file_put_contents('tasks.json', json_encode($tasks));
        echo '{"server":"added task"}';
    }

    public function changeTask($task)
    {
        $tasks = json_decode(\file_get_contents('tasks.json'), true);
        foreach ($tasks as &$item) {
            $item = (array)$item;
            if ($item['id'] == $task['id']) {
                $item['changeTask'] = false;
                $item['checked'] = $task['checked'];
            }
        }
        file_put_contents('tasks.json', json_encode($tasks));
        echo '{"server":"changed task"}';
    }

    public function deleteTask($task)
    {
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
