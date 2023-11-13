<?php
use Backend\Models\Product;
use Backend\Models\Type;
use Backend\Services\Db;
use PHPUnit\Framework\TestCase;



class ProductTest extends TestCase
{
    public function testCalculateTax(){
        $db = new Db('test');
        $type = Type::first();

        $product = new Product();
        $product->price = 100;
        $product->id_type = $type->id;
        $this->assertEquals(10, $product->calculateTax());
    }

    public function testCalculateTotal(){
        $db = new Db('test');
        $type = Type::first();

        $product = new Product();
        $product->price = 100;
        $product->id_type = $type->id;
        $this->assertEquals(110, (int) $product->calculateTotal());
    }

}
?>