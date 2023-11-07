<?php
namespace Backend\Models;

use ActiveRecord\Model;

class Product extends Model
{
    static string $table_name = 'products';

    public static array $belongs_to = [
        'type' => ['foreign_key' => 'id_type']
    ];
}

?>