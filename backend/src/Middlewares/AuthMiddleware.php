<?php
namespace Backend\Middlewares;

use Pecee\Http\Middleware\IMiddleware;
use Pecee\Http\Request;
use Backend\Services\FirebaseService;

class AuthMiddleware implements IMiddleware {

    public function handle(Request $request): void 
    {
        $token = $request->getHeader('Authorization');
        $token = str_replace('Bearer ', '', $token ?? '');
        $firebaseService = new FirebaseService();
        $uid = $firebaseService->verifyIdToken($token);
        if (!$uid) {
            response()->httpCode(401);
            response()->json([
                'message' => 'Unauthorized'
            ]);
        }
        // $request->setRewriteUrl(url('user.login'));
    }
}
?>