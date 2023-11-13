<?php
use Backend\Services\Db;

require './vendor/autoload.php';
require 'src/cors.php';

require_once 'src/Helpers/routes.php';
$db = new Db(); 

/* Load external routes file */
require_once 'src/Routes/routes.php';
?>