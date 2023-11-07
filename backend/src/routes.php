<?php
use Pecee\SimpleRouter\SimpleRouter;

\Pecee\SimpleRouter\SimpleRouter::setDefaultNamespace('\Backend\'');


SimpleRouter::group(['prefix' => '/api', 'middleware' => \Backend\Middlewares\AuthMiddleware::class], function () {
    SimpleRouter::get('/orders', function() {
        return 'Hello orders';
    });

    SimpleRouter::get('/products', function() {
        return 'Products';
    });
});

// Start the routing
SimpleRouter::start()

?>