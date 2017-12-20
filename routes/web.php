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
Route::get('/index',function (){
   return view('index');
});
Route::post('/test',function (){
   echo '123';
});
Route::post('/share/shareList','ShareController@shareList');
Route::post('/share/sharedList','ShareController@sharedList');
Route::post('/share/insert','ShareController@insert');
Route::post('/share/delete','ShareController@delete');

