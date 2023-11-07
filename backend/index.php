<?php
use Backend\Services\Db;

require './vendor/autoload.php';
require 'src/cors.php';

$db = new Db(); 

require_once 'src/Routes/helpers.php';
/* Load external routes file */
require_once 'src/Routes/routes.php';
?>