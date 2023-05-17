<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\Subscribe\PaypalController;
use App\Models\ShopItems;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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



Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/', function () {
        $items = ShopItems::where('is_enable', 1)->where('is_deleted', 0)->orderBy('position')->get();
        return Inertia::render('Home', [
            'items' => $items
        ]);
    })->name('index');

    Route::get('/{slug}/{itemID}', [ItemController::class, 'index'])->name('showItem');
    Route::post('/buy', [ItemController::class, 'buy'])->name('buy');
});


Route::middleware(['web', 'auth'])->name('subscribe.')->prefix('subscribe')->group(function () {
    Route::get('/', [SubscribeController::class, 'index'])->name('index');
    Route::get('/details/{id}', [SubscribeController::class, 'details'])->name('details');
    
    Route::name('paypal.')->prefix('paypal')->group(function () {
        //Route::get('/plan', [PaypalController::class, 'create_plan'])->name('paypal.create_plan');
        Route::get('/start', [PaypalController::class, 'paypalRedirect'])->name('paypal.redirect');
        Route::get('/return', [PaypalController::class, 'paypalReturn'])->name('paypal.return');
    });
});