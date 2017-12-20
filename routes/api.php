<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//session 部分 不需要token
Route::post('/login','SessionController@login');
Route::post('/register','SessionController@register');
Route::post('/captcha','SessionController@captcha');
