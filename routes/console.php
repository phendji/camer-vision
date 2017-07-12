<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

Artisan::command('import', function (\App\Services\UserService $import) {
    $import->handleImport();
})->describe('Import data');

Artisan::command('create:admin {firstname} {lastname} {email} {password}',
    function ($firstname, $lastname, $email, $password) {
        $admin = [
            'firstname'     => $firstname,
            'lastname'  => $lastname,
            'email'    => $email,
            'password' => Hash::make($password)
        ];

        \App\Models\Admin::create($admin);
    }
)->describe('Create an admin');