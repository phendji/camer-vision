<?php

namespace App\Providers;

use App\Services\UserService;
use App\Services\ImportServices\ImportCurrentDataSheetService;
use App\Services\ImportServices\ImportFormationHistorySheetService;
use App\Services\ImportServices\ImportJobHistorySheetService;
use App\Services\ImportServices\ImportService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Register helper functions
         */
        foreach (glob(app_path().'/Helpers/*.php') as $filename){
            require_once($filename);
        }

        /**
         * User service
         */
        $this->app->singleton('user', function ($app) {
            return new UserService();
        });
        $this->app->alias('user', UserService::class);
    }
}
