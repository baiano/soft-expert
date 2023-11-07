<?php
namespace Backend\Models;

use ActiveRecord\Model;

class Order extends Model
{
    static string $table_name = 'orders';
    
    static array $has_many = [
        'order_products' => ['foreign_key' => 'id_order'],
    ];
    
}
?>