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
 * User routes
 */
Route::group(['prefix' => 'users'], function () {
    Route::post('/', 'UserController@store');
    Route::get('/', 'UserController@index');
});

/**
 * Propositions routes
 */
Route::group(['prefix' => 'propositions'], function () {
    Route::post('/', 'PropositionController@store');
    Route::get('/', 'PropositionController@index');
});

/**
 * Email routes
 */
Route::post('/send', 'ContactController@send');

/**
 * Like routes
 * View routes
 */
Route::put('updateLike/{id}', 'PropositionController@updateLike');
Route::put('updateView/{id}', 'PropositionController@updateView');
