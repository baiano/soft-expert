<?php
namespace Backend\Models;

use ActiveRecord\Model;

class Type extends Model
{
    static string $table_name = 'types';
    
    static array $has_many = [
        'order_products' => ['foreign_key' => 'id_order'],
    ];
    
}
?>