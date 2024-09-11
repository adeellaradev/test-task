<?php

namespace App\Services;

use Stripe\StripeClient;
use Exception;
use Illuminate\Support\Facades\Log;

class StripeService
{
    protected $stripe;

    public function __construct(StripeClient $stripe)
    {
        $this->stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
    }

    public function createCustomer($user)
    {
        try {
            if (!$user->stripe_customer_id) {
                $customer = $this->stripe->customers->create([
                    'email' => $user->email,
                    'name' => $user->name,
                ]);
                return $customer;
            }
        } catch (Exception $e) {
            Log::error("Stripe customer creation failed for user ID {$user->id}: " . $e->getMessage());
            throw new Exception("Failed to create Stripe customer");
        }

        return null;
    }
}
