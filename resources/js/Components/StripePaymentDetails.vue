<script setup>
   import { ref, onMounted } from 'vue';
   import axios from 'axios';

    const paymentMethods = ref(null);
    const errorMessage = ref(null);
    const isLoading = ref(false);  
    const lastPayment = ref(null);
 


    const fetchPaymentMethods  = async () => {
        isLoading.value = true;
        try {
            const response = await axios.get('/stripe/payments');  // Adjust route as needed
            if (response.data.success) {
                    console.log(response.data)
                    if (response.data.payment_methods.length > 0) {
                        paymentMethods.value = response.data.payment_methods;
                    } else {
                        errorMessage.value = 'No payment methods found.';
                    }
                } else {
                    errorMessage.value = response.data.error || 'Failed to fetch payment methods.';
                }
                isLoading.value = false;
        } catch (error) { 
            errorMessage.value = 'Failed to fetch payment methods. Please try again later.';
        }finally {
                isLoading.value = false;
        }
    };

    const fetchLastPayment  = async () => {
        isLoading.value = true;
        try {
            const response = await axios.get('/stripe/recent/payment');    
            if (response.data.success) { 
                lastPayment.value = response.data.invoice; 
            }else {
                errorMessage.value = response.data.error;
            } 
        } catch (error) {
            console.log(error)
            errorMessage.value = 'An error occurred while fetching the payment details. Please try again later.';
        } finally {
            isLoading.value = false;  
        }
    };

    onMounted(() => {
        fetchPaymentMethods();
        fetchLastPayment();
    });
    
     

</script>

<template> 
    

    <div class="flex justify-between items-center mb-4 mt-3 mb-3">
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Payment Methods
        </h2> 
    </div> 
    <div v-if="paymentMethods" class="  justify-between items-right mb-4"> 
        <ul class="text-left"> 
            <li v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
                <strong>Card:</strong> {{ paymentMethod.card.brand }} ending in {{ paymentMethod.card.last4 }}
            </li>
        </ul> 
    </div>   
    
    <div v-if="isLoading"> 
        <div   class="flex justify-center my-4">
            <svg class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8v2a10 10 0 100-20v2a8 8 0 010 16z"></path>
            </svg>
           &nbsp;&nbsp;  <strong> Loading payment methods. .. </strong>  
        </div> 
    </div> 
    <div class="flex justify-between items-center mb-4 mt-8  ">
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Most Recent Payments
        </h2> 
    </div> 
    <div v-if="lastPayment" class=" text-left mb-4"> 
        
            <p><strong>Invoice ID:</strong> {{ lastPayment.id }}</p>
            <p><strong>Amount:</strong> {{ (lastPayment.amount_paid / 100).toFixed(2) | currency }}</p>
            <p><strong>Date:</strong> {{ new Date(lastPayment.created * 1000).toLocaleDateString() }}</p>
            <p><strong>Status:</strong> {{ lastPayment.status }}</p>
         
    </div> 
    <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
    </div>

</template>
