<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

class AddTask
{
     /**
     * add new task
     *
     * @param array $clientTask
     * @return void
     */
    public function init(array $clientTask):string
    {
        // get tasks from file
        $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
        // add id
        //empty($serverTasks) ? $clientTask['id'] = 1: $clientTask['id'] = max(array_column($serverTasks, 'id')) + 1;
        // update message
        $clientTask['message'] = "server received and added task: " . $clientTask['taskname'];
        $clientTask['addedToServer'] = true;
        // add task from client to start of tasks on server
        array_unshift($serverTasks, $clientTask);
        // save it
        file_put_contents('tasks.json', json_encode(array_values($serverTasks)));
        // send back a response
        return json_encode($clientTask);
    }
}
