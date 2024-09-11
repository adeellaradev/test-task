<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
   
  
      <form  class="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
        id="payment-form" @submit.prevent="handleSubmit"
      > 
        <div v-if="error" class="mb-4 bg-white rounded-lg max-w-md w-full">
          <p class="text-center text-red-400 mt-6 mb-3 text-sm">{{ error }}</p>
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
   
        
        <div class="mb-4">
          <label for="card-holder-name" class="block text-gray-700 text-sm font-bold mb-2">Name on the card</label>
          <input
            type="text"
            id="card-holder-name"
            v-model="cardHolderName"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Name on the card"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="card-element" class="block text-gray-700 text-sm font-bold mb-4">Card information</label>
          <div id="card-element" class="mt-5"></div>
        </div>
        <span  v-if="isProcessing">
          <svg class="animate-spin h-12 w-12 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="#7B5CE6"   viewBox="0 0 24 24">
            <circle class="opacity-80" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-60" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3.5 3.5L4 12z"></path>
              </svg>
        </span>
        <button
          type="submit"
          class="w-full bg-dark-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-opacity-50"
           v-if="!isProcessing"
          id="card-button"
          :data-secret="clientSecret"
          :disabled="isProcessing"
        >
          Pay Now
        </button>
      </form> 
  
    </div>
  
  
        
  
  
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { loadStripe } from '@stripe/stripe-js';
  import axios from 'axios';
  import { Inertia } from '@inertiajs/inertia';
  
  export default {
    props: {
       
      
      planId: {
        type: Number,
        required: true,
      }, 
      clientSecret: {
        type: String,
        required: true,
    },
    },
    setup(props, { emit }) { 
      const cardHolderName = ref('');
      const error = ref(props.sessionError);
      const isProcessing = ref(false);
      let stripe, cardElement;
      let modalPromiseResolve, modalPromiseReject;
  
      onMounted(async () => {
        stripe = await loadStripe('pk_test_51PsPeDImpHhc4Ni6pBqGGR84WfYug4wJJablOc6eAXsP72yjPTWbC9Kt9jnoOkbfg6tREpMwx5CG5TvR0H3WijSR00BwdOahJy');
        const elements = stripe.elements();
        cardElement = elements.create('card');
        cardElement.mount('#card-element'); 
      });
  
  
   
      const handleSubmit = async () => {
          isProcessing.value = true;
        try { 
          const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(props.clientSecret, {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: cardHolderName.value, 
                },
              },
          });
          if (stripeError) {
            error.value = stripeError.message;
            isProcessing.value = false;
          } else {
            try {
              const response = await axios.post('/create-payment-intent', {
                payment_method: setupIntent.payment_method,
                planId: props.planId,
                card_holder_name: cardHolderName.value,
              });
              Inertia.visit('/dashboard');
            } catch (err) {
              if (err.response && err.response.status === 422) {
                Inertia.visit('/stripe-error', {
                  preserveState: true,
                  props: { error: err.response.data.message }
                });
              } else {
                error.value = 'An error occurred while processing your payment.';
              }
            } finally {
              isProcessing.value = false;
            }
          } 
        }catch(err){
          console.error("Error in subscription process", err);
          error.value = err.message;
        } 
        
      };
     
  
      
  
  
  
      return {
        
        cardHolderName,
        error,
        isProcessing,
        handleSubmit,   
        
      };
    },
  };
  </script>
  
  
  <style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css');
  
  :root {
    --dark-blue: #0f172a;
  }
  
  body {
    background-color: var(--dark-blue);
  }
  
  .bg-dark-blue {
    background-color: #0f172a; /* Ensure this is the intended color */
  }
  
  .text-white {
    color: #ffffff;
  }
  
  .hover\:bg-blue-600:hover {
    background-color: #2563eb; /* Ensure this color is intended for hover state */
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 300px;
  }
  
  .modal-content button {
    margin: 10px;
  }
  
  /* Make sure there's no rule overriding visibility */
  
  
  
  </style>
  