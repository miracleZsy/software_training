<?php

namespace App\Http\Middleware;

use App\traits\Auth;
use App\User;
use Closure;
use Illuminate\Support\Facades\Log;

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
        try {
            if ($token = Auth::create()->verify()) {
                $user = new User();
                $user->username = $token->getClaim('username');
                $user->uuid = $token->getClaim('uuid');
                $user->company_id = $token->getClaim('companyId');
                $request->attributes->set('user', $user);
                return $next($request);
            } else die(json_encode([
                'code' => 401,
                'msg' => 'please login'
            ]));
        }catch (\Exception $e) {
        Log::error($e);
        }
    }
}
