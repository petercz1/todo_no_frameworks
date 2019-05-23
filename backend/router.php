<?php

//simple no-framework skinny router

(function () {

    // these are the paths we want
    $uri = [
    '/'=>'home.html',
    '/about'=>'about.html',
    '/enrol'=> 'register.php',
    '/thanks'=>'thanks.php'
    ];

    // split uri from any params - php puts them in the $_GET array
    // this splits the path at the questionmark character
    // and captures only the first part
    $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 1);

    // this checks if there is a path, or directs to '/'
    $route = $uri_parts[0] ?? '/';

    // if a route is matched, set this to true
    $matched = false;

    foreach ($uri as $routeKey => $routeValue) {
        if (preg_match("#^$routeKey$#", $route)) {
            include "pages/" . $routeValue;
            $matched = true;
        }
    }

    // if no match, send 404
    if (!$matched) {
        include 'pages/fourohfour.html';
    }
})();