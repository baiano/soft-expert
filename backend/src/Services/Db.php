<?php
namespace Backend\Services;

use ActiveRecord\Config;

class Db {
    private $conn;

    public function __construct($enviroment = 'development') {
        $this->conn = null;
        $cfg = Config::instance();
        $connectionParams = [
            'development' => 'pgsql://postgres:postgres@localhost/postgres',
            'test' => 'pgsql://postgres:postgres@localhost/postgres',
            'production' => 'pgsql://postgres:postgres@pgsql/postgres'
        ];

        try {
            $cfg->set_connections($connectionParams);
            $cfg->set_default_connection($enviroment); // Set your default connection here
        } catch(\PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function getActiveRecordConnection() {
        return \ActiveRecord\Connection::instance();
    }
}
?>