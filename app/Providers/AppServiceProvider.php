<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if(env('APP_ENV', 'local') !== "local")
            \URL::forceScheme('https');

        \Illuminate\Support\Facades\URL::forceRootUrl(\Illuminate\Support\Facades\Config::get('app.url'));
        if (str_contains(\Illuminate\Support\Facades\Config::get('app.url'), 'https://')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        Inertia::share([
            'locale' => function () {
                return app()->getLocale();
            },
            'errors' => function () {
                return session()->get('errors') ? session()->get('errors')->getBag('default')->getMessages() : (object) [];
            }
        ]);
    }
}
