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
<<<<<<< HEAD
<<<<<<< HEAD
Route::post('/customer/changePhase','CustomerController@changePhase');
Route::post('/customer/getPhaseLog','CustomerController@getPhaseLog');
=======

//sale部分
Route::post('/sale/customerManage','SaleController@customerManage');
>>>>>>> f1fb3a51c321a27d07008bb18bd376177eb79b47
=======

//sale部分
Route::post('/sale/customerManage','SaleController@customerManage');
Route::post('/customer/changePhase','CustomerController@changePhase');
Route::post('/customer/getPhaseLog','CustomerController@getPhaseLog');
>>>>>>> 5f513062b7c866ef728c9fd9e724178e31a7b27b
