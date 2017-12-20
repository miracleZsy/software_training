<?php

namespace App\Http\Middleware;

use App\traits\Auth;
use App\User;
use Closure;

class Session
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($token = Auth::create()->verify()) {
            $user = new User();
            $user->username = $token->getClaim('username');
            $user->uuid = $token->getClaim('uuid');
            $request->attributes->set('user', $user);
            $token = Auth::create()->buildToken([
                'username' => $user->username,
                'uuid' => $user->uuid
            ]);
            setcookie('token', (String)$token, time() + 3600, '/');
            return $next($request);
        } else die(json_encode([
            'code' => 401,
            'msg' => 'please login'
        ]));
    }
}
