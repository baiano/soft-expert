<?php
use Backend\Services\Db;

require './vendor/autoload.php';
require 'src/cors.php';

require_once 'src/Helpers/routes.php';
// get .env variables
$enviroment = getenv('APP_ENV');
if ($enviroment == false || $enviroment == '') {
    $enviroment = 'production';
}
$db = new Db($enviroment); 

/* Load external routes file */
require_once 'src/Routes/routes.php';
?>