<?php
namespace Backend\Models;

use ActiveRecord\Model;

class OrderProduct extends Model
{
    static string $table_name = 'order_products';

    // Define the relationships with Orders and Products
    static array $belongs_to = [
        'order' => ['foreign_key' => 'id_order'],
        'product' => ['foreign_key' => 'id_product']
    ];

    static $validates_numericality_of = [
        ['quantity', 'greater_than' => 0]
    ];
}

?>