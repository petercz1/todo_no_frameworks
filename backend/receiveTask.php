<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new ReceiveTask)->init();

// receives newTask, changeTask and deleteTask.
// I would probably split these functions up into separate classes but for now it works as a backend demo
class ReceiveTask
{

    /**
     * init function: receive task from frontend
     * data is NOT arriving from a multipart-data form or an application/x-www-form-urlencoded
     * so is not available in $_GET/$_POST superglobals 
     * hence use file_get_contents('php://input')
     * 
     * @return void
     */
    public function init():void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // check if frontend sent a task or array of tasks
        if (array_key_exists('taskname', $data)) {
            $this->simpleRouter($data);
        } else {
            foreach ($data as $task) {
                $this->simpleRouter($task);
            }
        }
    }

    /**
     * simplerouter: it is what it is
     * 
     * @param array $task
     * @return void
     */
    public function simpleRouter(array $task):void
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

    /**
     * Undocumented function
     *
     * @param [type] $task
     * @return void
     */
    public function addTask(array $task):void
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
                $item['changeTask'] = false; // set back to false now we've changed it
                $item['checked'] = $task['checked']; // sync check on server with frontend
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
