<?php
namespace Backend\Models;

use ActiveRecord\Model;

class Product extends Model
{
    static string $table_name = 'products';

    public static array $belongs_to = [
        'type' => ['foreign_key' => 'id_type']
    ];

    static array $validates_presence_of = [
        ['product'],
        ['price'],
        ['id_type']
    ];

    static array $validates_numericality_of = [
        ['price', 'greater_than' => 0]
    ];

    public function calculateTax() {
        return $this->price * $this->type->tax;
    }

    public function calculateTotal() {
        return $this->price * (1+$this->type->tax);
    }
}

?>