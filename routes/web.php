<?php


use App\Http\Controllers\ItemController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\Subscribe\PaypalController;
use App\Http\Controllers\PayPalPaymentController;
use App\Models\ShopItems;
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

Route::prefix('credit')->name('credit.')->middleware(['web', 'auth'])->group(function () {
    Route::get('/', [CreditController::class, 'index'])->name('index');
    Route::get('/offers/{id}', [CreditController::class, 'offers'])->name('offers');
    Route::get('/offers/start/{id}', [CreditController::class, 'startPayment'])->name('start');
    Route::prefix('paypal')->name('paypal.')->middleware(['web', 'auth'])->group(function () {
        Route::get('/confirm/{pid}', [PayPalPaymentController::class, 'confirm'])->name('confirm');
        Route::get('/success', [PayPalPaymentController::class, 'success'])->name('success');
        Route::get('/error', [PayPalPaymentController::class, 'error'])->name('error');
    });
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