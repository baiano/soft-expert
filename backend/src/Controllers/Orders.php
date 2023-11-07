<?php
namespace Backend\Controllers;
use Pecee\Http\Request;

class Orders {
  public function list() {
    echo '<pre>';
    print_r($_REQUEST);
  }

  public function create() {
    echo '<pre>';
    print_r($_REQUEST);
  }

  public function details(int $id) {
    echo $id;
  }
}

?>