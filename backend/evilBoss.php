<?php
declare(strict_types=1);
namespace chipbug\todo;

ini_set("log_errors", "1");
ini_set("error_log", getcwd() . "/debug.log");

(new EvilBoss)->init();

class EvilBoss
{
    /**
     * generate pointless tasks from evil boss
     *
     * @return string
     */
    public function init():void
    {
        // get current tasks from json file
        $tasks = json_decode(\file_get_contents('tasks.json'), true);
        error_log('adding evil boss task');
        
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
        empty($tasks) ? $evilTask['id'] = 1: $evilTask['id'] = max(array_column($tasks, 'id')) + 1;
        
        // add to the start of task array
        array_unshift($tasks, $evilTask);
        file_put_contents('tasks.json', json_encode($tasks));
        $this->sse($evilTask);
    }
    
    /**
     * Server Sent Event
     * fires data back every 8 - 10 seconds
     *
     * @param array $data
     * @return void
     */
    public function sse(array $evilTask):void
    {
        // send update every 
        //$timeint = 1000 * rand(10, 15);

        try {
            header("Cache-Control: no-cache");
            header("Content-Type: text/event-stream");
            echo "event: evilBossAddedTask" . PHP_EOL;
            echo "retry: " . $timeint . PHP_EOL;
            echo "data: ".json_encode($evilTask). PHP_EOL;
            echo PHP_EOL;
            flush();
        } catch (Exception $ex) {
            echo "{\"server\":\"server problem: {$ex->message}\"}";
        }
    }
}
