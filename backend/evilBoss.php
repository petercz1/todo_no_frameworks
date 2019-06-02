<?php
declare(strict_types=1);
namespace chipbug\todo;

// dumps debug stuff into a debug.log file in this directory
// error_log('stuff'); for simple debug,
// error_log(print_r($my_array, true)); for arrays.
ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

require_once 'receiveTask.php';

(new EvilBoss)->init();

class EvilBoss
{
    /**
     * generate pointless tasks from evil boss
     *
     * @return void
     */
    public function init():void
    {
        // ok get current tasks
        //$serverTasks = json_decode(\file_get_contents('tasks.json'), true);

        // create evil task
        $evilTask = array(
            "taskname" => "&#9785; Attend pointless meeting",
            "message" => "evil boss added: Attend pointless meeting",
            "changeTask" => 0,
            "deleteTask" => 0,
            "checked" => 0,
            "css" => "closed",
        );
        // set id
        // if tasks.json is empty set id = 1, else find max and add 1
        // empty($serverTasks) ? $evilTask['id'] = 1: $evilTask['id'] = max(array_column($serverTasks, 'id')) + 1;
        
        // add to the start of task array
        //array_unshift($serverTasks, $evilTask);
        //file_put_contents('tasks.json', json_encode($serverTasks));
        // send evilTask to client
        $receiveTask = new ReceiveTask();
        $this->sse($receiveTask->newTask($evilTask));
    }
    
    /**
     * Server Sent Event
     * pushes data to client every 10 - 15 seconds
     *
     * @param array $data
     * @return void
     */
    public function sse(array $evilTask):void
    {
        // send update every 10 - 15 seconds
        $timeint = 1000 * rand(10, 15);

        try {
            header("Cache-Control: no-cache");
            header("Content-Type: text/event-stream");
            echo "event: evilBossAddedTask" . PHP_EOL;
            echo "retry: " . $timeint . PHP_EOL;
            // echo "data: ".json_encode($evilTask). PHP_EOL;
            echo "data: ".$evilTask . PHP_EOL;
            echo PHP_EOL;
            flush();
        } catch (Exception $ex) {
            echo "{\"server\":\"server problem: {$ex->message}\"}";
        }
    }
}
