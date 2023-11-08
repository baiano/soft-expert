<?php
namespace Backend\Controllers;

use Backend\Models\Type;
use Pecee\Http\Request;

class TypesController {
  public function list() {
    $types = Type::all(['includes' => 'order_products']);
    $result = $this->formatTypes($types);
    response()->json($result);
  }

  public function create() {
    $type = new Type();
    $body = request()->getInputHandler()->all();
    $type->type = $body['type'];
    $type->tax = $body['tax'] / 100;
    $type->save();
    response($type);
  }

  public function details(int $id) {
    $type = Type::find($id);
    $result = $this->formatTypes([$type]);
    response()->json($result[0]);
  }

  public function delete(int $id) {
    $type = Type::find($id);
    $type->delete();
    response()->json(['message' => 'Type deleted']);
  }

  public function update(int $id) {
    $type = Type::find($id);
    $body = request()->getInputHandler()->all();
    $type->type = $body['type'];
    $type->tax = $body['tax'] / 100;
    $type->save();
    response()->json($type->to_array());
  }

  private function formatTypes($types) {
    foreach ($types as $index => $type) {
      $type->tax = (float) $type->tax * 100;
      $result[$index] = $type->to_array();
    }
    return $result;
  }
}

?>