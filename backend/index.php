<?php
use Backend\Services\Db;
require "./vendor/autoload.php";

$db = new Db(); 

/* Load external routes file */
require_once 'src/routes.php';
?>