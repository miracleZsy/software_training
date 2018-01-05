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
//share部分
Route::post('/share/shareList','ShareController@shareList');
Route::post('/share/sharedList','ShareController@sharedList');
Route::post('/share/insert','ShareController@insert');
Route::post('/share/delete','ShareController@delete');
Route::post('/share/count','ShareController@shareCount');



//customer部分
Route::post('/customer/insert','CustomerController@insert');
Route::post('/customer/update','CustomerController@update');
Route::post('/customer/delete','CustomerController@delete');
Route::post('/customer/list','CustomerController@list');
Route::post('/customer/select','CustomerController@select');
Route::post('/customer/count','CustomerController@amountCount');

//sale部分
Route::post('/sale/customerManage','SaleController@customerManage');
Route::post('/customer/changePhase','CustomerController@changePhase');
Route::post('/customer/getPhaseLog','CustomerController@getPhaseLog');

//user部分
Route::post('/user/insert','UserController@insert');
Route::post('/user/update','UserController@update');
Route::post('/user/delete','UserController@delete');
Route::post('/user/list','UserController@list');
Route::post('/user/select','UserController@select');
Route::post('/user/count','UserController@amountCount');
Route::post('/customer/getMyCustomers','CustomerController@getMyCustomers');

//sale plan 部分
Route::post('/sale/plan/list','SaleController@list');
Route::post('/sale/plan/select','SaleController@select');
Route::post('/sale/plan/insert','SaleController@insert');
Route::post('/sale/plan/update','SaleController@update');
Route::post('/sale/plan/delete','SaleController@delete');
