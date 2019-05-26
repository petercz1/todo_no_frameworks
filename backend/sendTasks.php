<?php
declare(strict_types=1);
namespace chipbug\todo;

(new SendTasks)->init();

class SendTasks
{
    public function init()
    {
        echo \file_get_contents('tasks.json');
    }
}