<?php
declare(strict_types=1);
namespace chipbug\todo;

(new SendTasks)->init();

class SendTasks
{
    /**
     * Sends tasks to client
     *
     * @return void
     */
    public function init():void
    {
        // check if file exists
        if(!file_get_contents('tasks.json')){
            \file_put_contents('tasks.json','[]');
            // send empty js array to client
            echo '[]';
        }else{
            // send to client
            echo \file_get_contents('tasks.json');
        }
    }
}