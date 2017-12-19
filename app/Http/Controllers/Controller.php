<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function json_die($res)
    {
        die(json_encode($res, JSON_UNESCAPED_UNICODE));
    }
    public static function isJson($string)
    {
        return gettype(json_decode($string, true)) == "array" ? true : false;
    }
}
