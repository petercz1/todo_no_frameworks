<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

require './addTask.php';
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

        sleep(1); // mimic a 'slow' server
        
        if ($this->clientTask['deleteTask']) {

            $deleteTask = new DeleteTask();
            echo $deleteTask->init($this->clientTask);

        } elseif ($this->clientTask['changeTask']) {

            $changeTask = new ChangeTask();
            echo $changeTask->init($this->clientTask);

        } else {

            $addTask = new AddTask();
            echo $addTask->init($this->clientTask);

        }
    }
}
