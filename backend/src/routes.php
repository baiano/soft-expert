<?php
use Pecee\SimpleRouter\SimpleRouter;

/**
 * The default namespace for route-callbacks, so we don't have to specify it each time.
 * Can be overwritten by using the namespace config option on your routes.
 */

 SimpleRouter::group(['prefix' => '/api'], function () {
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