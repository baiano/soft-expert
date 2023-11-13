<?php
namespace Backend\Controllers;

use Backend\Models\Order;
use Backend\Models\OrderProduct;
use Pecee\Http\Request;

class OrdersController {
  public function list() {
    $orders = Order::all(['include' => 'order_products']);
    $result = $this->formatOrder($orders);
    response()->json($result);
  }

  public function create() {
    $order = new Order();
    $body = request()->getInputHandler()->all();
    
    // loop all $body['products'] to calculate total price, including tax
    $totalPrice = 0;
    $qtyProducts = 0;

    foreach ($body['products'] as $product) {
      $totalPrice += $product['quantity'] * ($product['product']['price'] * (1+$product['product']['type']['tax']));
      $qtyProducts += $product['quantity'];
    }
    
    $order->qty_products = $qtyProducts;
    $order->value = $totalPrice;
    $order->save();

    foreach ($body['products'] as $product) {
      $orderProduct = new OrderProduct();
      $orderProduct->id_order = $order->id;
      $orderProduct->id_product = $product['product']['id'];
      $orderProduct->quantity = $product['quantity'];
      $orderProduct->save();
    }

    response()->json($order->to_array());
  }

  public function details(int $id) {
    $orders = Order::find($id);
    $result = $this->formatOrder([$orders]);
    response()->json($result[0]);
  }

  public function delete(int $id) {
    $order = Order::find($id);
    $orderProducts = OrderProduct::where('id_order = '.$id)->to_a();
    foreach ($orderProducts as $orderProduct) {
      $orderProduct->delete();
    }
    $order->delete();
    response()->json(['message' => 'Order deleted']);
  }

  private function formatOrder($orders) {
    foreach ($orders as $index => $order) {
      $result[$index] = $order->to_array();
      foreach ($order->order_products as $productIndex => $order_product) {
        $result[$index]['products'][$productIndex]['quantity'] = $order_product->quantity;
        $result[$index]['products'][$productIndex]['product'] = $order_product->product->to_array();
        if ($order_product->product->type)
          $result[$index]['products'][$productIndex]['product']['type'] = $order_product->product->type->to_array();
      }
    }
    return $result;
  }
}

?>