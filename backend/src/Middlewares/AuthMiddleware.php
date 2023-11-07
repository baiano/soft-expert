<?php
namespace Backend\Middlewares;

use Pecee\Http\Middleware\IMiddleware;
use Pecee\Http\Request;

class AuthMiddleware implements IMiddleware {

    public function handle(Request $request): void 
    {
        // $request->setRewriteUrl(url('user.login'));
    }
}
?>