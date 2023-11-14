<?php

namespace Backend\Models;

use ActiveRecord\Model;

class Type extends Model
{
    static string $table_name = 'types';

    static array $validates_numericality_of = [
        'tax' => ['greater_than' => 0]
    ];
}
