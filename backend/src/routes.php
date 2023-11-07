<?php
use Pecee\SimpleRouter\SimpleRouter;

\Pecee\SimpleRouter\SimpleRouter::setDefaultNamespace('\Backend\'');


SimpleRouter::group(['prefix' => '/api', 'middleware' => \Backend\Middlewares\AuthMiddleware::class], function () {
    SimpleRouter::get('/orders', [\Backend\Controllers\OrdersController::class, 'list']);
    SimpleRouter::get('/orders/{id}', [\Backend\Controllers\OrdersController::class, 'details']);
    SimpleRouter::post('/orders', [\Backend\Controllers\OrdersController::class, 'create']);

    SimpleRouter::get('/products', function() {
        return 'Products';
    });
});

// Start the routing
SimpleRouter::start()

?>