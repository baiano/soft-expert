<?php
use Pecee\SimpleRouter\SimpleRouter;

\Pecee\SimpleRouter\SimpleRouter::setDefaultNamespace('\Backend\'');


SimpleRouter::group(['prefix' => '/api', 'middleware' => \Backend\Middlewares\AuthMiddleware::class], function () {
    SimpleRouter::get('/orders', [\Backend\Controllers\OrdersController::class, 'list']);
    SimpleRouter::get('/order/{id}', [\Backend\Controllers\OrdersController::class, 'details']);
    SimpleRouter::post('/orders', [\Backend\Controllers\OrdersController::class, 'create']);

    SimpleRouter::get('/products', [\Backend\Controllers\ProductsController::class, 'list']);
    SimpleRouter::get('/product/{id}', [\Backend\Controllers\ProductsController::class, 'details']);
    SimpleRouter::post('/products', [\Backend\Controllers\ProductsController::class, 'create']);
    SimpleRouter::delete('/product/{id}', [\Backend\Controllers\ProductsController::class, 'delete']);
    SimpleRouter::put('/product/{id}', [\Backend\Controllers\ProductsController::class, 'update']);

    SimpleRouter::get('/types', [\Backend\Controllers\TypesController::class, 'list']);
    SimpleRouter::get('/type/{id}', [\Backend\Controllers\TypesController::class, 'details']);
    SimpleRouter::post('/types', [\Backend\Controllers\TypesController::class, 'create']);
    SimpleRouter::delete('/type/{id}', [\Backend\Controllers\TypesController::class, 'delete']);
    SimpleRouter::put('/type/{id}', [\Backend\Controllers\TypesController::class, 'update']);
});

// Start the routing
SimpleRouter::start()

?>