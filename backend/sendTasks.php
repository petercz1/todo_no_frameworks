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
        echo \file_get_contents('tasks.json');
    }
}