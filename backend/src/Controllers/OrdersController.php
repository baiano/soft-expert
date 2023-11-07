<?php
namespace Backend\Controllers;

use Backend\Models\Order;

class OrdersController {
  public function list() {
    $orders = Order::all(['include' => 'order_products']);
    foreach ($orders as $index => $order) {
      $result[$index] = $order->to_array();
      foreach ($order->order_products as $productIndex => $order_product) {
        $result[$index]['products'][$productIndex]['product'] = $order_product->product->to_array();
        $result[$index]['products'][$productIndex]['product']['type'] = $order_product->product->type->to_array();
      }
    }
    response()->json($result);
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