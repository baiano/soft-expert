use ActiveRecord\Config;
use ActiveRecord\Connection;
<?php

require_once __DIR__ . '/../../vendor/autoload.php';


class Db {
    private $conn;

    public function __construct() {
        $this->conn = null;
        try {
            Config::initialize(function($cfg) {
                $cfg->set_model_directory(__DIR__ . '/../../models');
                $cfg->set_connections(array(
                    'development' => "pgsql:host=pgsql;port=5432;dbname=my_database",
                ));
            });
            $this->conn = Connection::instance('development');
        } catch(PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }
    }

    public function getConnection() {
        return $this->conn;
    }
}

