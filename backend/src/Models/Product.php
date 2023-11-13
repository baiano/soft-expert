<?php
namespace Backend\Models;

use ActiveRecord\Model;

class Product extends Model
{
    static string $table_name = 'products';

    public static array $belongs_to = [
        'type' => ['foreign_key' => 'id_type']
    ];

    public function calculateTax() {
        return $this->price * $this->type->tax;
    }

    public function calculateTotal() {
        return $this->price * (1+$this->type->tax);
    }
}

?>