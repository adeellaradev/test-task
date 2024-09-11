<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Subscription;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\StripeClient;
use App\Services\StripeService;
use Illuminate\Http\JsonResponse;
class StripeController extends Controller
{

    protected $stripeService;
    
    public function __construct(StripeService $stripeService)
    {
        $this->stripeService = $stripeService;
    }

    public function showSubscription(){
        return Inertia::render('Subscription');
    }
    public function stripePlans(){
       
        return Inertia::render('Plans');;
    }

   

     

   

    public function stripeAuth(): JsonResponse
    {
        $user = Auth::user();    
        try {
            if (!$user->hasStripeId()) {
                // Create a Stripe customer if one does not exist
                $user->createAsStripeCustomer();

                // Optionally, you can add a default payment method if provided
                // $user->updateDefaultPaymentMethod($request->input('payment_method')); 
                return response()->json([
                    'success' => true,
                    'message' => 'Stripe customer created successfully.',
                    'user' => $user,
                ], 200);
            } 
            
            return response()->json([
                'success' => false,
                'message' => 'User already has a Stripe customer ID.',
                'user' => $user,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function stripeProfile()
    {
        $user = Auth::user();    
        try {

            if (!$user->hasStripeId()) {
                return response()->json([
                    'success' => false,
                    'message' => 'User does not have a Stripe customer ID.',
                ], 404);
            }
            $stripeCustomer = $user->asStripeCustomer();  
            return response()->json([
                'success' => true,
                'profile' => $stripeCustomer ,
            ]);
        } catch (\Exception $e) {
            
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }


    }

    public function stripePayments(){
        $user = Auth::user();   
       
        if (!$user->hasStripeId()) {
            return response()->json([
                'success' => false,
                'error' => 'User does not have a Stripe customer ID.',
            ], 404);
        }
        try {
            $paymentMethods = $user->paymentMethods();
            $formattedPaymentMethods = $paymentMethods->map(function ($paymentMethod) {
                return [
                    'id' => $paymentMethod->id,
                    'type' => $paymentMethod->type,
                    'card' => $paymentMethod->card, // Access card details
                    // Add other properties as needed
                ];
            }); 
            
            return response()->json([
                'success' => true,
                'payment_methods' => $formattedPaymentMethods, // Payment methods array
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch payment methods: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function stripeInvoices(){
        $user = Auth::user();   
        if (!$user->hasStripeId()) {
            return response()->json([
                'success' => false,
                'error' => 'User does not have a Stripe customer ID.',
            ], 404);
        }
        try {
            // Fetch invoices
            $invoices = $user->invoices();
    
            // If you need a specific invoice or additional processing, you can do that here.
            $formattedInvoices = $invoices->map(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'amount_due' => $invoice->amount_due,
                    'amount_paid' => $invoice->amount_paid,
                    'amount_remaining' => $invoice->amount_remaining,
                    'status' => $invoice->status,
                    'created_at' => $invoice->created_at,
                    // Add other properties as needed
                ];
            });
    
            return response()->json([
                'success' => true,
                'invoices' => $formattedInvoices, // Formatted invoices array
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch invoices: ' . $e->getMessage(),
            ], 500);
        }
        
    }


    public function stripeLastPayment()
    {
        $user = Auth::user(); 
        if (!$user->hasStripeId()) {
            return response()->json([
                'success' => false,
                'error' => 'User does not have a Stripe customer ID.',
            ], 404);
        }
        try {
            $stripe = new StripeClient(env('STRIPE_SECRET'));  
            $invoices = $stripe->invoices->all([
                'customer' =>  $user->stripe_id, 
                'limit' => 1, // Limit to the most recent invoice
                
            ]); 
            $lastInvoice = $invoices->data[0] ?? null;  
             
            if ($lastInvoice) {
                return response()->json([
                    'success' => true,
                    'invoice' => $lastInvoice,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'No invoices found.',
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch last payment from Stripe: ' . $e->getMessage(),
            ]);
        }
    }

    
    public function fetchPlans(){
       
        try {
            $stripe = new StripeClient(env('STRIPE_SECRET'));
            $plans = $stripe->plans->all();

            return response()->json([
                'success' => true,
                'plans' => $plans->data, // Array of plans
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch Stripe plans: ' . $e->getMessage(),
            ], 500);
        }
        
    }

    public function payment(Request $request)
    {
        
        $planId = $request->query('planId'); 
        $intent = auth()->user()->createSetupIntent();  
        return Inertia::render('Payment', [
            'planId' => $planId,
            'clientSecret' => $intent->client_secret, 
        ]);  

      
    }

    public function createPaymentIntent(Request $request)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET')); 
        $priceId = $request->input('planId'); 
        try {
            $subscription =   $request->user()
            ->newSubscription($priceId, $priceId)
            ->create($request['payment_method']); 
            if ($subscription) { 
                return response()->json([
                    'success' => true,
                    'message' => 'Subscription has been complete.', 
                ]);
            } 
            return response()->json([
                'success' => false,
                'message' => 'error while creating subscription.',  
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
 

    }

     
    
 


}
