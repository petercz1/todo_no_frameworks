<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

class ChangeTask{

  /**
     * change task if checked/unchecked
     *
     * @param array $task
     * @return string
     */
    public function init(array $clientTask): string
    {
        //get tasks from file
        $serverTasks = json_decode(\file_get_contents('tasks.json'), true);
        foreach ($serverTasks as &$serverTask) {
            if ($serverTask['clientId'] == $clientTask['clientId']) {
                // set message to checked/unchecked
                if ($clientTask['checked']) {
                    $clientTask['message'] = "server checked task: " . $clientTask['taskname'];
                } else {
                    $clientTask['message'] = "server unchecked task: " . $clientTask['taskname'];
                }
                // sync check on server with client
                $serverTask['checked'] = $clientTask['checked'];
                // set back to false now we've changed it
                $serverTask['changeTask'] = false;
            }
        }
        file_put_contents('tasks.json', json_encode(array_values($serverTasks)));
        // send back a response
        return json_encode($clientTask);
    }
}