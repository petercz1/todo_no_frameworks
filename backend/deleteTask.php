<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

class DeleteTask
{

     /**
     * delete task
     *
     * @param array $task
     * @return string
     */
    public function init(array $clientTask): string
    {
        //get tasks from file
        $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
        foreach ($serverTasks as $key => $serverTask) {
            if ($serverTask['clientId'] == $clientTask['clientId']) {
                unset($serverTasks[$key]); // delete task
            }
        }
        file_put_contents('tasks.json', json_encode(array_values($serverTasks)));
        // send back a response
        $clientTask['message'] = "server deleted task: " . $clientTask['taskname'];
        return json_encode($clientTask);
    }
}
