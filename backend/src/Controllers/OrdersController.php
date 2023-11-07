<?php
namespace Backend\Controllers;

use Backend\Models\Order;

class OrdersController {
  public function list() {
    echo '<pre>';
    $orders = Order::all(['include' => 'order_products']);
    foreach ($orders as $index => $order) {
      $result[$index]['order'] = $order->to_json();
      foreach ($order->order_products as $productIndex => $order_product) {
        $result[$index]['products'][$productIndex]['product'] = $order_product->product->to_json();
        $result[$index]['products'][$productIndex]['type'] = $order_product->product->type->to_json();
      }
    }
    return json_encode($result);
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