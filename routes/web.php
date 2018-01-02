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
Route::post('/customer/changePhase','CustomerController@changePhase');
Route::post('/customer/getPhaseLog','CustomerController@getPhaseLog');

//user部分
Route::post('/user/insert','UserController@insert');
Route::post('/user/update','UserController@update');
Route::post('/user/delete','UserController@delete');
Route::post('/user/list','UserController@list');
Route::post('/user/select','UserController@select');
Route::post('/user/count','UserController@amountCount');
