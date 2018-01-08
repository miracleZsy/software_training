<?php
/**
 * Created by PhpStorm.
 * User: zhouqianyu
 * Date: 2017/12/23
 * Time: 下午7:48
 */

namespace App\Http\Controllers;


use App\traits\Auth;
/**
 * Class CustomerController
 * @package App\Http\Controllers
 * @auther zhouqianyu
 */
class IndexController extends Controller
{
    public function index(){
        $token = Auth::create()->verify();
        if ($token) return view('index');
        else return view('login');
    }
}