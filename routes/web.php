<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//index

//customer部分
Route::post('/customer/insert','CustomerController@insert');
Route::post('/customer/update','CustomerController@update');
Route::post('/customer/delete','CustomerController@delete');
Route::post('/customer/list','CustomerController@list');
Route::post('/customer/select','CustomerController@select');
Route::post('/customer/count','CustomerController@amountCount');