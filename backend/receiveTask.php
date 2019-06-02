<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

require './newTask.php';
require './changeTask.php';
require './deleteTask.php';

// IIFE
(new ReceiveTask)->init();

// receives newTask, changeTask and deleteTask.
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

        sleep(2); // mimic a 'slow' server
        if ($this->clientTask['deleteTask']) {
            
            echo $this->deleteTask($this->clientTask);
        } elseif ($this->clientTask['changeTask']) {
            echo $this->changeTask($this->clientTask);
        } else {
            echo $this->newTask($this->clientTask);
        }
    }

    // /**
    //  * add new task from client
    //  *
    //  * @param array $clientTask
    //  * @return void
    //  */
    // public function newTask(array $clientTask):string
    // {
    //     // get tasks from file
    //     $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
    //     // add id
    //     empty($serverTasks) ? $clientTask['id'] = 1: $clientTask['id'] = max(array_column($serverTasks, 'id')) + 1;
    //     // update message
    //     $clientTask['message'] = "server received and added task: " . $clientTask['taskname'];
    //     // add task from client to start of tasks on server
    //     array_unshift($serverTasks, $clientTask);
    //     // save it
    //     file_put_contents('tasks.json', json_encode($serverTasks));
    //     // send back a response
    //     return json_encode($clientTask);
    // }

    // /**
    //  * change task if checked/unchecked
    //  *
    //  * @param array $task
    //  * @return string
    //  */
    // public function changeTask(array $clientTask): string
    // {
    //     //get tasks from file
    //     $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
    //     foreach ($serverTasks as &$serverTask) {
    //         if ($serverTask['id'] == $clientTask['id']) {
    //             // set message to checked/unchecked
    //             if ($clientTask['checked']) {
    //                 $clientTask['message'] = "server checked task: " . $clientTask['taskname'];
    //             } else {
    //                 $clientTask['message'] = "server unchecked task: " . $clientTask['taskname'];
    //             }
    //             // sync check on server with client
    //             $serverTask['checked'] = $clientTask['checked'];
    //             // set back to false now we've changed it
    //             $serverTask['changeTask'] = false;
    //         }
    //     }
    //     file_put_contents('tasks.json', json_encode($serverTasks));
    //     // send back a response
    //     return json_encode($clientTask);
    // }

    // /**
    //  * delete task
    //  *
    //  * @param array $task
    //  * @return string
    //  */
    // public function deleteTask(array $clientTask): string
    // {
    //     //get tasks from file
    //     $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
    //     foreach ($serverTasks as $key => $serverTask) {
    //         if ($serverTask['id'] == $clientTask['id']) {
    //             unset($serverTasks[$key]); // delete task
    //         }
    //     }
    //     file_put_contents('tasks.json', json_encode($serverTasks));
    //     // send back a response
    //     $clientTask['message'] = "server deleted task: " . $clientTask['taskname'];
    //     return json_encode($clientTask);
    // }
}
