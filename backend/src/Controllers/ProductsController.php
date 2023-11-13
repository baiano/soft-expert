<?php
namespace Backend\Controllers;

use Backend\Models\Product;
use Pecee\Http\Request;

class ProductsController {
  public function list() {
    $products = Product::all(['include' => 'type']);
    $result = $this->formatProducts($products);
    response()->json($result);
  }

  public function create() {
    $product = new Product();
    $body = request()->getInputHandler()->all();
    $product->product = $body['product'];
    $product->price = $body['price'];
    $product->id_type = $body['type']['id'];
    $product->save();
    response()->json($product->to_array());
  }

  public function details(int $id) {
    $product = Product::find($id);
    $result = $this->formatProducts([$product]);
    response()->json($result[0]);
  }

  public function delete(int $id) {
    $product = Product::find($id);
    $product->delete();
    response()->json(['message' => 'Product deleted']);
  }

  public function update(int $id) {
    $product = Product::find($id);
    $body = request()->getInputHandler()->all();
    $product->product = $body['product'];
    $product->price = $body['price'];
    $product->id_type = $body['type']['id'];
    $product->save();
    response()->json($product->to_array());
  }

  private function formatProducts($products) {
    foreach ($products as $index => $product) {
      $result[$index] = $product->to_array();
      if ($product->type)
        $result[$index]['type'] = $product->type->to_array();
    }
    return $result;
  }
}

?>