<?php


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

/**
 * Auth routes
 */
Route::post('authenticate', 'AuthController@authenticate');
Route::get('authenticate/user', 'AuthController@getAuthenticatedUser');

/**
 * User routes
 */
Route::group(['prefix' => 'users'], function () {
    Route::post('/', 'UserController@store');
    Route::get('/', 'UserController@index');
});

