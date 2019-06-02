<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

// IIFE
(new ReceiveTask)->init();

// receives newTask, changeTask and deleteTask.
// I would probably split these functions up into separate classes but for now it works as a backend demo
class ReceiveTask
{

    private $clientTask = [];

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
        $this->clientTask = json_decode(file_get_contents('php://input'), true);
        // check if frontend sent a task or array of tasks
        if (array_key_exists('taskname', $this->clientTask)) {
            error_log('single array');
            error_log(print_r($this->clientTask, true));
            $this->simpleRouter($this->clientTask);
        } 
        // else {
        //     foreach ($this->clientTask as $task) {
        //         error_log('PROBLEM - Multidimensional array here...');
        //         error_log(print_r($task, true));
        //         $this->simpleRouter($task);
        //     }
        // }
    }

    /**
     * simplerouter: it is what it is
     * sleeps for a couple of seconds to mimic a slow server
     *
     * @param array $task
     * @return void
     */
    public function simpleRouter(array $task):void
    {
        sleep(2); // mimic a 'slow' server
        if ($task['deleteTask']) {
            echo $this->deleteTask($task);
        } elseif ($task['changeTask']) {
            echo $this->changeTask($task);
        } else {
            echo $this->newTask($task);
        }
    }

    /**
     * add new task from client
     *
     * @param array $clientTask
     * @return void
     */
    public function newTask(array $clientTask):string
    {
        $serverTasks = json_decode(\file_get_contents('tasks.json'), true); //get tasks from file
        $clientTask['message'] = "server received and added task: " . $clientTask['taskname']; //update message
        array_unshift($serverTasks, $clientTask); // add task from client to start of tasks on server
        file_put_contents('tasks.json', json_encode($serverTasks));
        // send back a response
        return json_encode($clientTask);
    }

    /**
     * change task if checked/unchecked
     *
     * @param array $task
     * @return string
     */
    public function changeTask(array $clientTask): string
    {
        error_log(print_r($clientTask, true));
        $serverTasks = json_decode(\file_get_contents('tasks.json'), true); //get tasks from file
        foreach ($serverTasks as &$serverTask) {
            $serverTask = (array)$serverTask;
            if ($serverTask['id'] == $clientTask['id']) {
                if($clientTask['checked']){
                    $clientTask['message'] = "server checked task: " . $clientTask['taskname'];
                }else{
                    $clientTask['message'] = "server unchecked task: " . $clientTask['taskname'];
                }
                $serverTask['checked'] = $clientTask['checked']; // sync check on server with frontend
                $serverTask['changeTask'] = false; // set back to false now we've changed it
            }
        }
        file_put_contents('tasks.json', json_encode($serverTasks));
        // send back a response
        return json_encode($clientTask);
    }

    /**
     * delete task
     *
     * @param array $task
     * @return string
     */
    public function deleteTask(array $clientTask): string
    {
        $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
        $index = array_search($clientTask['id'], array_column($serverTasks, 'id'));
        foreach ($serverTasks as $key => $item) {
            if ($item['id'] == $clientTask['id']) {
                unset($serverTasks[$key]); // delete task
            }
        }
        file_put_contents('tasks.json', json_encode($serverTasks));
        // send back a response
        $clientTask['message'] = "server deleted task: " . $clientTask['taskname'];
        return json_encode($clientTask);
    }
}
