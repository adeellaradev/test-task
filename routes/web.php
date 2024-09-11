<?php

use App\Http\Controllers\CronofyController;
use App\Http\Controllers\PdfReaderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
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


// routes/web.php

///
////////////////


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

 

 

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [CronofyController::class, 'dashboard'])->name('dashboard');
    Route::get('/get-events', [CronofyController::class, 'getEvents'])->name('get.events');
    Route::get('/cronofy/auth', [CronofyController::class, 'redirectToCronofy'])->name('cronofy.auth');
    Route::get('/cronofy/callback', [CronofyController::class, 'handleCronofyCallback'])->name('cronofy.callback');
    Route::get('/my-profile', [CronofyController::class, 'myProfile'])->name('my.profile'); 
    Route::get('/get-profile', [CronofyController::class, 'getProfile'])->name('get.profile'); 
    Route::get('/get-cronofy-profile', [CronofyController::class, 'getCronofyProfile'])->name('get.cronofy.profile'); 
    Route::get('/show/calendars', [CronofyController::class, 'showCalendars'])->name('show.calendars'); 

    Route::get('/stripe/subscription', [StripeController::class, 'showSubscription'])->name('stripe.subscription');
    Route::get('/stripe/auth', [StripeController::class, 'stripeAuth'])->name('stripe.auth');
    Route::get('/stripe/profile', [StripeController::class, 'stripeProfile'])->name('stripe.profile');
    Route::get('/stripe/payments', [StripeController::class, 'stripePayments'])->name('stripe.payments');
    Route::get('/stripe/invoices', [StripeController::class, 'stripeInvoices'])->name('stripe.invoices');
    Route::get('/stripe/recent/payment', [StripeController::class, 'stripeLastPayment'])->name('stripe.recent.payment');

    Route::get('/stripe/plans', [StripeController::class, 'stripePlans'])->name('stripe.plans');
    

    Route::get('/fetch/plans', [StripeController::class, 'fetchPlans'])->name('fetch.plans');
    Route::post('/stripe/subscribe', [StripeController::class, 'subscribeToPlan']);

    Route::get('/payment', [StripeController::class, 'payment'])->name('payment');
    Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);



});

require __DIR__.'/auth.php';
